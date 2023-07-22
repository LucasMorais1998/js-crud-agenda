require('dotenv').config();

const path = require('path');
const express = require('express');
const routes = require('./routes');
const helmet = require('helmet');
const csrf = require('csurf');
const mongoose = require('mongoose');
const session = require('express-session');
const MongoStore = require('connect-mongo');
const flash = require('connect-flash');
const {
  globalMiddleware,
  CheckCsrfError,
  csrfMiddleware,
} = require('./src/middlewares/middleware');

const app = express();

const connectionString = process.env.CONNECTIONSTRING;
mongoose
  .connect(connectionString, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log('connect to database 📦');
    app.emit('databaseConnected');
  })
  .catch(e => console.error(e));

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static(path.resolve(__dirname, 'public')));
app.use(helmet());

const sessionOptions = session({
  secret: 'texto q ninguém vai saber',
  resave: false,
  saveUninitialized: false,
  cookie: {
    maxAge: 1000 * 60 * 60 * 24 * 7,
    httpOnly: true,
  },
  store: MongoStore.create({ mongoUrl: process.env.CONNECTIONSTRING }),
});

app.use(sessionOptions);
app.use(flash());

app.set('views', path.resolve(__dirname, 'src', 'views'));
app.set('view engine', 'ejs');

app.use(csrf());

app.use(globalMiddleware);
app.use(CheckCsrfError);
app.use(csrfMiddleware);

app.use(routes);

const port = 8080;

app.on('databaseConnected', () => {
  app.listen(port, console.log(`Server is running on port ${port} 🚀 -> http://localhost:${port}`));
});
