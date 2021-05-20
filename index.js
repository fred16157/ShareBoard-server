const express = require('express');
const app = express();
const server = require('http').createServer(app);
const io = require('socket.io')(server);
const consola = require('consola');

io.on('connection', (socket) => {
    socket.on('copy', (data) => {
        consola.info('copy called - ' + data);
        socket.broadcast.emit('paste', data);
    });
});

server.listen(3000, () => {
    consola.success('Listening on port 3000');
});