const express = require('express');

const UserController = require('./app/controllers/userController');

const routes = express.Router();

routes.get('/users', UserController.index);
routes.post('/users', UserController.register);
routes.post('/users', UserController.authenticate);

module.exports = routes;
