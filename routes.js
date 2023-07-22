const express = require('express');
const route = express.Router();

const homeController = require('./src/controllers/homeController');
const contactsController = require('./src/controllers/contactsController');

// * Home routes
route.get('/', homeController.homePage);
route.post('/', homeController.postPage);

// * Contacts routes
route.get('/contacts', contactsController.contactsPage);

module.exports = route;