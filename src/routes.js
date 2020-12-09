const express = require('express');

const UserController = require('./app/controllers/userController');
const SessionController = require('./app/controllers/sessionController');

const routes = express.Router();

routes.post('/users', UserController.store);
routes.get('/users', UserController.list);
routes.post('/session', SessionController.authenticate);
// routes.get('/session', SessionController.register);

module.exports = routes;
