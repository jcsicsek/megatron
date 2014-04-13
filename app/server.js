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
var loansController = require('./controllers/loans').create();
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

app.use(app.router);


var urls = {
  users: {
    logout: '/logout',
    whoami: '/users/whoami',
    consumerlogin: '/login',
    register: '/register',
    partnerlogin: '/partner/login'
    // partnerregister: '/partner/register',
    // adminlogin: '/admin/login',
    // adminregister: '/admin/register'
  },
  static: {
    root: '/',
    company: '/company',
    products: '/products',
    support: '/support',
    faqs: '/faqs',
    contact: '/contact'
  },
  loans: {
    apply: '/loans/apply'
  },
  consumers: {
    ustatementsummary: '/u',
    ustatementdetail: '/u/detail',
    upay: '/u/pay'
  },
  invoices: {
    summary: '/i/:invoiceid',
    details: '/i/:invoiceid/details',
    pay: '/i/invoiceid/pay'
  }
}

app.locals.urls = urls;


//staticy-pages
app.get(urls.static.root, staticController.root);
app.get(urls.static.company, staticController.company);
app.get(urls.static.products, staticController.products);
app.get(urls.static.support, staticController.support);
app.get(urls.static.faqs, staticController.faqs);
app.get(urls.static.contact, staticController.contact);
app.post(urls.static.contact, staticController.sendContact);

//users routes
app.get(urls.users.consumerlogin, usersController.consumerloginPage);
app.post(urls.users.consumerlogin, passport.authenticate('local', {failureRedirect: urls.users.consumerlogin}), usersController.consumerlogin);
app.post(urls.users.partnerlogin, passport.authenticate('local', {failureRedirect: urls.users.partnerlogin}), usersController.partnerlogin);
app.get(urls.users.logout, usersController.logout);
app.get(urls.users.register, usersController.registerPage);
app.post(urls.users.register, usersController.register);
app.get(urls.users.whoami, usersController.whoami);

//loan routes
app.post(urls.loans.apply, loansController.apply);
app.get(urls.loans.apply, loansController.applyPage);

app.get(urls.invoices.summary, loansController.invoiceSummary);
app.get(urls.invoices.details, loansController.invoiceDetails);
app.get(urls.invoices.pay, loansController.invoicePayPage);


//error handlers
app.use(function(req, res, next){
    res.status(404).render('error-pages/404', {title: "Sorry, page not found | tabb.io" });
});

app.use(function(req, res, next){
    res.status(500).render('error-pages/500', {title: "Sorry, page not found | tabb.io" });
});

//redirects
app.get('/ts2014video', function(req, res) {
  res.redirect('https://www.youtube.com/watch?v=s3lh7MxWCVc');
});


app.listen(port);
console.log("app listening on port " + port);

module.exports = app;
