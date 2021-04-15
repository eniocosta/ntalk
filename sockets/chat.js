module.exports = function(io) {
    const { sockets } = io;
    sockets.on('connection', function(client) {
        const { usuario } = client.handshake.session;
        client.on('send-server', function(data) {
            let msg = `<b>${usuario.nome}:</b> ${data}<br>`;
            client.emit('send-client', msg);
            client.broadcast.emit('send-client', msg);
        });
    });
}