const express = require('express');
const morgan = require('morgan');
const expressSession = require('express-session');
const sessionFileStore = require('session-file-store');
const expressHandlebars = require('express-handlebars');
const config = require('../config');

const todo = require('./todo');

// APP
const app = express();
const FileStore = sessionFileStore(expressSession);
app.use(expressSession({ ...config.sessionOptions, store: new FileStore() }));
app.engine('hbs', expressHandlebars({ extname: '.hbs' }));
app.set('views', process.cwd() + '/templates');
app.use(morgan(config.logFormat));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// MOUNTS
app.use('/todo', todo.routes);

// DEFAULTS
app.use(express.static("./static"));
app.all('/', (req, res) => res.render('index.hbs'));
app.use((req, res) => {
    let data = {
        layout: false,
        code: 404,
        status: "NOT_FOUND",
        message: req.hostname.toUpperCase() + req.originalUrl.toUpperCase()
    };

    res.render('error.hbs', data);
});

module.exports = { app };