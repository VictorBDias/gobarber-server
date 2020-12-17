import multer from 'multer';
import multerConfig from './config/multer';

const express = require('express');

const FileController = require('./app/controllers/fileController');
const UserController = require('./app/controllers/userController');
const SessionController = require('./app/controllers/sessionController');
const ProviderController = require('./app/controllers/providerController');
const AppointmentController = require('./app/controllers/appointmentController');
const ProviderAppointmentController = require('./app/controllers/providerAppointmentController');

const authMiddleware = require('./app/middlewares/auth');

const routes = express.Router();
const upload = multer(multerConfig);

// routes.post('/users', UserController.store);
routes.post('/users', UserController.register);
routes.get('/users', UserController.list);

routes.post('/session', SessionController.authenticate);

// rotas a partir desse middleware pedirão autenticação
routes.use(authMiddleware);

routes.put('/users', UserController.update);

routes.post('/files', upload.single('file'), FileController.store);

routes.get('/providers', ProviderController.index);

routes.post('/appointments', AppointmentController.store);
routes.get('/appointments', AppointmentController.index);

routes.get('/providerAppointments', ProviderAppointmentController.index);

module.exports = routes;
