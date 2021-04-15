const KEY = 'ntalk.sid', SECRET = 'ntalk';

const express = require('express');
const path = require('path');
const consign = require('consign');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const expressSession = require('express-session');
const methodOverride = require('method-override');
const error = require('./middlewares/error');

const app = express();

const server = require('http').Server(app);
const io = require('socket.io')(server);
const cookie = cookieParser(SECRET);
const store = new expressSession.MemoryStore();


app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(cookie);
app.use(expressSession({
    secret: SECRET,
    name: KEY,
    resave: true,
    saveUninitialized: true,
    store: store
}));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(methodOverride('_method'));
app.use(express.static(path.join(__dirname, 'public')));

io.use(function(socket, next) {
    const data = socket.request;
    cookie(data, {}, function(err) {
        const sessionID = data.signedCookies[KEY];
        store.get(sessionID, function(err, session) {
            if(err || !session) {
                return next(new Error('Acesso Negado'));
            } else {
                socket.handshake.session = session;
                return next();
            }
        })
    })
});

consign({})
  .include('models')
  .then('controllers')
  .then('routes')
  .into(app)
;

app.use(error.notFound);
app.use(error.serverError);

consign({})
  .include('sockets')
  .into(io)
;

server.listen(3000, () => {
  console.log('Ntalk no ar.');
});