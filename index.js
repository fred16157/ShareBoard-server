const express = require('express');
const app = express();
const server = require('http').createServer(app);
const io = require('socket.io')(server);
const consola = require('consola');
const mongoose = require('mongoose');
const path = require('path');
const fs = require('fs');
const crypto = require('crypto');
const User = require('./models/User');
const indexRouter = require('./router/index');
const apiRouter = require('./router/api');

app.use(express.static(path.join(__dirname, './static')));

app.set('view engine', 'ejs');
app.use(express.json());
app.use(express.urlencoded({extended: false}));

app.use('/', indexRouter);
app.use('/api', apiRouter);

let { port, mongoUrl, salt, maxFileSize } = require('./config.json');

io.on('connection', (socket) => {
    socket.on('login', async (username, password) => {
        const user = await User.findOne({username, password: encryptPass(password)}).exec();
        if(!user) {
            socket.emit('login-result', false);
            return;
        }
        socket.join(user.username);
        socket.username = user.username;
        socket.emit('login-result', true, maxFileSize);
    })

    socket.on('copy-text', (data) => {
        socket.to(socket.username).broadcast.emit('paste-text', data);
    });

    socket.on('copy-image', (data) => {
        socket.to(socket.username).broadcast.emit('paste-image', data);
    });

    socket.on('copy-file', async (name, data) => {
        socket.to(socket.username).broadcast.emit('paste-file', name, data);
    });

    socket.on('disconnect', () => {
        consola.info('disconnected');
    });
});

server.listen(port, () => {
    consola.success(`Listening on port ${port}`);
});

mongoose.connect(mongoUrl, (err) => {
    if(err) consola.error(`Error while connecting to MongoDB ${err}`);
    else consola.success('MongoDB connected');
});

function encryptPass(pass) {
    return crypto.pbkdf2Sync(pass, salt, 100000, 64, 'sha256').toString('base64');
}