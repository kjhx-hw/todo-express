const express = require('express');
const { list, add, save, remove } = require('./todo');

const routes = express.Router();

routes.get('/', (req, res) => res.redirect(303, '/todo/list'));
routes.get('/list', list)
routes.get('/styles.css', (req, res) => res.sendFile(process.cwd() + '/static/css/axle.css'));

routes.post('/add', add);
routes.post('/save', save);
routes.post('/remove', remove);

module.exports = { routes };