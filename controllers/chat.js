module.exports = function(app) {
    var ChatController = {
        index: function(req, res) {
            res.render('chat/index', { usuario: req.session.usuario });
        }
    }
    return ChatController;
}