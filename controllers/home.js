module.exports = (app) => {
    const HomeController = {
        index: function (req, res) {
            res.render('home/index');
        },

        login: function(req, res) {
            var {email, nome} = req.body.usuario;
            
            if(email && nome) {
                const { usuario } = req.body;
                usuario['contatos'] = [];
                req.session.usuario = usuario;
                res.redirect('/contatos');
            } else {
                res.redirect('/');
            }
        },

        logout: function(req, res) {
            req.session.destroy();
            res.redirect('/');
        }
    };

    return HomeController;
};