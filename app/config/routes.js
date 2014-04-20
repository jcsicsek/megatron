var urls = {
  users: {
    logout: '/logout',
    whoami: '/users/whoami',
    consumerlogin: '/statement',
    register: '/register',
    partnerlogin: '/partner/login',
    partnerregister: '/partner/register',
    // adminlogin: '/admin/login',
    // adminregister: '/admin/register'
  },
  static: {
    root: '/',
    company: '/company',
    products: '/products',
    api: '/api',
    apiapply: '/api/apply',
    apiloanrequest: '/api/loan-request',
    faqs: '/faqs',
    contact: '/contact',
    terms: '/terms',
    privacy: '/privacy-policy'
  },
  loans: {
    apply: '/loans/apply'
  },
  invoices: {
    portal: '/i',
    summary: function(invoiceid){return '/i/' + invoiceid},
    details: function(invoiceid){return '/i/' + invoiceid + '/details'},
    pay: function(invoiceid){return '/i/' + invoiceid + '/pay'}
  }
}

module.exports = function(app, passport, pgClient) {

  var usersController = require('../controllers/users').create(pgClient);
  var staticController = require('../controllers/static').create();
  var loansController = require('../controllers/loans').create();

  app.locals.urls = urls;


  //staticy-pages
  app.get(urls.static.root, staticController.root);
  app.get(urls.static.company, staticController.company);
  app.get(urls.static.products, staticController.products);
  app.get(urls.static.api, staticController.api);
  app.get(urls.static.apiapply, staticController.apiapply);
  app.get(urls.static.apiloanrequest, staticController.apiloanrequest);
  app.get(urls.static.faqs, staticController.faqs);
  app.get(urls.static.contact, staticController.contact);
  app.post(urls.static.contact, staticController.sendContact);
  app.get(urls.static.terms, staticController.terms);
  app.get(urls.static.privacy, staticController.privacy);

  //users routes
  app.get(urls.users.consumerlogin, usersController.consumerloginPage);
  app.get(urls.users.partnerlogin, usersController.partnerloginPage);
  app.post(urls.users.consumerlogin, passport.authenticate('local', {failureRedirect: urls.users.consumerlogin}), usersController.consumerlogin);
  app.post(urls.users.partnerlogin, passport.authenticate('local', {failureRedirect: urls.users.partnerlogin}), usersController.partnerlogin);
  app.get(urls.users.logout, usersController.logout);
  app.get(urls.users.partnerregister, usersController.partnerregisterPage);
  app.post(urls.users.partnerregister, usersController.partnerregister);
  app.get(urls.users.whoami, usersController.whoami);

  //loan routes
  app.post(urls.loans.apply, loansController.apply);
  app.get(urls.loans.apply, loansController.applyPage);

  app.get(urls.invoices.summary(':invoiceid'), loansController.invoiceSummary);
  app.get(urls.invoices.details(':invoiceid'), loansController.invoiceDetails);
  app.get(urls.invoices.pay(':invoiceid'), loansController.invoicePayPage);
  app.post(urls.invoices.portal, loansController.invoicePortal);
}

