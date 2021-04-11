module.exports = function(app) {
    var ContatosController = {
        index: function(req, res) {
            const { usuario } = req.session;
            res.render('contatos/index', { usuario, contatos: usuario.contatos });
        },

        create: function(req, res) {
            const { contato } = req.body;
            const { usuario } = req.session;
            usuario.contatos.push(contato);
            res.redirect('/contatos');
        },

        show: function(req, res) {
            const { id } = req.params;
            const contato = req.session.usuario.contatos[id];
            res.sender('contatos/show', { id, contato })
        },

        edit: function(req, res) { 
            const { id } = req.params;
            const { usuario } = req.session;
            const contato = usuario.contatos[id];
            res.sender('contatos/edit', { id, usuario, contato });
        },

        update: function(req, res) {
            const { contato } = req.body;
            const { usuario } = req.session;
            usuario.contatos[req.params.id] = contato;
            res.redirect('/contatos');
        },

        destroy: function(req, res) {
            const { usuario } = req.session;
            const { id } = req.params;
            usuario.contatos.splice(id, 1);
            res.redirect('/contatos');
        }
    }
    return ContatosController;
}