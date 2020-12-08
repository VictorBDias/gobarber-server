const express = require('express');

const UserController = require('./app/controllers/userController');

const routes = express.Router();

routes.post('/users', UserController.store);
routes.get('/', UserController.list);

module.exports = routes;
