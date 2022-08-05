const express = require('express');
const { registerEmail, sendNewsletter } = require('./controllers/newsletter');

const routes = express();

routes.post('/emails', registerEmail);

routes.post('/newsletter', sendNewsletter);

module.exports = routes;