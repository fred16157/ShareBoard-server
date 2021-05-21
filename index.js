const express = require('express');
const app = express();
const server = require('http').createServer(app);
const io = require('socket.io')(server);
const consola = require('consola');

io.on('connection', (socket) => {
    socket.on('copy-text', (data) => {
        consola.info('Text copy called - ' + data);
        socket.broadcast.emit('paste-text', data);
        consola.success('Broadcasted text ' + data);
    });

    socket.on('copy-image', (data) => {
        consola.info('Image copy called');
        socket.broadcast.emit('paste-image', data);
        consola.success('Broadcasted image');
    });
});

server.listen(3000, () => {
    consola.success('Listening on port 3000');
});