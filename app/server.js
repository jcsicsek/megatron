var express = require('express');
var pg = require('pg');
var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
var swig = require('swig');

var pgConnString = process.env.DATABASE_URL;
var port = process.env.PORT || 5000;

var pgClient = new pg.Client(pgConnString);
pgClient.connect();

var usersController = require('./controllers/users').create(pgClient);
var usersModel = require('./models/users').create(pgClient);
var passwordHash = require('password-hash');

passport.serializeUser(function(user, done) {
  done(null, user.id);
});

passport.deserializeUser(function(id, done) {
  usersModel.get(id, function (error, user) {
    done(error, user);
  });
});

passport.use(new LocalStrategy(
  function(email, password, done) {
    usersModel.getByEmail(email, function(error, user) {
      if (error) {
        done(error);
      } else if (!user) {
        done(null, false, { message: 'Unknown user ' + email });
      } else if (!passwordHash.verify(password, user.password)) {
        done(null, false, { message: 'Invalid password' });
      } else{
        done(null, user);    
      }
    });
  }
));

var app = express();

//Setup Swig template engine
app.engine('html', swig.renderFile);
app.set('view engine', 'html');
app.set('views', __dirname + '/views/');
app.set('view cache', false);
swig.setDefaults({ cache: false });

app.use(express.json());
app.use(express.urlencoded());
app.use(express.cookieParser());
app.use(express.session({ secret: 'poop' }));
app.use(passport.initialize());
app.use(passport.session());

app.get('/users/login', usersController.loginPage);
app.post('/users/login', usersController.login);

app.listen(port);
console.log("app listening on port " + port);

module.exports = app;
