const express = require('express');
const route = express.Router();

const homeController = require('./src/controllers/homeController');
const loginController = require('./src/controllers/loginController');
const registerController = require('./src/controllers/registerController');

// * Home routes
route.get('/', homeController.index);

// * Login routes
route.get('/login/index', loginController.index);

// * Register routes
route.get('/register/index', registerController.index);
route.post('/register/create-account', registerController.createAccount);

module.exports = route;
