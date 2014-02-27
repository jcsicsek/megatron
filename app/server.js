var express = require('express');
var pg = require('pg');

var pgConnString = process.env.DATABASE_URL;
var port = process.env.PORT || 5000;

var pgClient = new pg.Client(pgConnString);
pgClient.connect();

var usersController = require('./controllers/users').create(pgClient);

var app = express();

app.use(express.json());
app.use(express.urlencoded());

app.get('/users/login', usersController.loginPage);
app.post('/users/login', usersController.login);

app.listen(port);
console.log("app listening on port " + port);

module.exports = app;
