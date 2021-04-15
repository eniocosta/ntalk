module.exports = function(app) {
    const autenticar = require('./../middlewares/autenticador')
    const { chat } = app.controllers;
    app.get('/chat', autenticar, chat.index)

}