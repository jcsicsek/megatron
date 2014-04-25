var express = require('express');
var pg = require('pg');
var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
var swig = require('swig');
var logger = require('winston');
var timeago = require('timeago');

var pgConnString = process.env.DATABASE_URL;
var port = process.env.PORT || 5000;

var pgClient = new pg.Client(pgConnString);
pgClient.connect();

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
    process.nextTick(function() {
      console.log("Passport looking up user with email", email);
      usersModel.getByEmail(email, function(error, user) {
        if (error) {
          done(error);
        } else if (!user) {
          done(null, false, { message: 'Unknown user ' + email });
        } else if (!passwordHash.verify(password, user.password)) {
          done(null, false, { message: 'Invalid password' });
        } else if (!user.active) {
          done(null, false, {message: "User is not active" });
        } else {
          done(null, user);    
        }
      });      
    })
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
app.use(express.static(path.join(__dirname, '/public')));
app.use(passport.initialize());
app.use(passport.session());

app.use(function(req, res, next) {
  var user;
  if (req.user) {
    user = req.user;
    user.is = {
      authenticated: true
    }
    user.is[user.role] = true;
  } else {
    user = {
      is: {
        authenticated: false
      }
    }
  }
  res.locals.user = user;
  next();
});

app.use(function(req, res, next) {
 res.locals.active_page = req.path;
 next();
});

var loggerStream = {
  write: function(message, encoding){
    logger.info(message);
  }
};
app.use(express.logger({stream:loggerStream}));

app.locals.timeago = timeago;

app.use(app.router);

require('./config/routes').configure(app, passport, pgClient);


//error handler
app.use(function(req, res, next){
    res.status(404).render('error-pages/404', {title: "Sorry, page not found | tabb.io" });
});

//redirects
app.get('/ts2014video', function(req, res) {
  res.redirect('https://www.youtube.com/watch?v=s3lh7MxWCVc');
});


app.listen(port);
console.log("app listening on port " + port);

module.exports = app;
