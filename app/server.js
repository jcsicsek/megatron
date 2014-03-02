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
var staticController = require('./controllers/static').create();
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
var path = require('path');

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
app.use(express.bodyParser());
app.use(express.methodOverride());
app.use(app.router);
app.use(express.static(path.join(__dirname, 'public')));
app.use(passport.initialize());
app.use(passport.session());

var urls = {
  users: {
    login: '/users/login',
  },
  static: {
    root: '/',
    about: '/about',
    merchants: '/merchants',
    consumers: '/consumers',
    creditLab: '/credit-lab',
    support: '/support',
    contact: '/contact'
  }
}

app.locals.urls = urls;

//staticy-pages
app.get(urls.static.root, staticController.root);
app.get(urls.static.about, staticController.about);
app.get(urls.static.merchants, staticController.merchants);
app.get(urls.static.consumers, staticController.consumers);
app.get(urls.static.creditLab, staticController.creditLab);
app.get(urls.static.support, staticController.support);
app.get(urls.static.contact, staticController.contact);

//users routes
app.get(urls.users.login, usersController.loginPage);
app.post(urls.users.login, usersController.login);

//error handlers
app.use(function(req, res, next){
    res.status(404).render('error-pages/404', {title: "Sorry, page not found | tabb.io" });
});

app.use(function(req, res, next){
    res.status(500).render('error-pages/500', {title: "Sorry, page not found | tabb.io" });
});

app.listen(port);
console.log("app listening on port " + port);

module.exports = app;
