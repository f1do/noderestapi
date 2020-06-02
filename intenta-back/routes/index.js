import express from 'express';
const app = express();

app.use('/api', require('./note'));
app.use('/api', require('./user'));
app.use('/login', require('./login'));

module.exports = app;