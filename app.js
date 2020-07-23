require('module-alias/register');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const cors = require('cors');
const session = require('express-session');
const passport = require('@infrastructure/passport');
const routes = require('@routes');
const socketio = require('@infrastructure/socketio');

const app = express();
const server = require('http').Server(app);

const PORT = process.env.PORT || 8080;

const corsOptions = {
  origin: true,
  credentials: true,
};

app.use(cors(corsOptions));
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

const sequelize = require('@infrastructure/database');
sequelize.sync();

const sessionOptions = {
  secret: 'SeRectKeY@123',
  resave: false,
  saveUninitialized: false,
};

if (app.get('env') === 'production') {
  app.set('trust proxy', 1);
  sessionOptions.cookie = {
    sameSite: 'None',
    secure: true,
  };
}

app.use(session(sessionOptions));

app.use(passport.initialize());
app.use(passport.session());

socketio.connect(server);
routes(app);

server.listen(PORT, () => {
  console.log(`App listening on PORT: ${PORT}`);
});
