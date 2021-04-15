module.exports = function(io) {
    const { sockets } = io;
    sockets.on('connection', function(client) {
        client.on('send-server', function(data) {
            var msg = "<b>"+data.nome+":</b> "+data.msg+"<br>";
            client.emit('send-client', msg);
            client.broadcast.emit('send-client', msg);
        });
    });
}