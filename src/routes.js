import multer from 'multer';
import multerConfig from './config/multer';

const express = require('express');

const FileController = require('./app/controllers/fileController');
const UserController = require('./app/controllers/userController');
const SessionController = require('./app/controllers/sessionController');
const ProviderController = require('./app/controllers/providerController');

const authMiddleware = require('./app/middlewares/auth');

const routes = express.Router();
const upload = multer(multerConfig);

// routes.post('/users', UserController.store);
routes.get('/users', UserController.list);
routes.post('/session', SessionController.authenticate);
routes.post('/users', UserController.register);

routes.use(authMiddleware);

routes.put('/users', UserController.update);

routes.post('/files', upload.single('file'), FileController.store);

routes.get('/providers', ProviderController.index);
module.exports = routes;
