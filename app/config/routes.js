
var urls = {
  users: {
    logout: '/logout',
    whoami: '/users/whoami',
    viewstatement: '/view-statement',
    partnerlogin: '/partner/login',
    partnerregister: '/partner/register'
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
  },
  merchants: {
    overview: '/manage',
    invoices: '/invoices',
    settings: '/settings',
    loans: '/loans'
  }
}

module.exports = {
  configure: function(app, passport, pgClient) {
    var middleware = require('../middleware').create(pgClient);

    var usersController = require('../controllers/users').create(pgClient);
    var staticController = require('../controllers/static').create();
    var loansController = require('../controllers/loans').create();
    var merchantsController = require('../controllers/merchants').create();

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
    app.get(urls.users.viewstatement, middleware.setMerchantContext, usersController.viewstatementPage);
    app.post(urls.users.viewstatement, passport.authenticate('local', {failureRedirect: urls.users.viewstatement}), usersController.viewstatement);
    app.get(urls.users.partnerlogin, usersController.partnerloginPage);
    app.post(urls.users.partnerlogin, passport.authenticate('local', {failureRedirect: urls.users.partnerlogin}), usersController.partnerlogin);
    app.get(urls.users.logout, usersController.logout);
    app.get(urls.users.partnerregister, usersController.partnerregisterPage);
    app.post(urls.users.partnerregister, usersController.partnerregister);
    app.get(urls.users.whoami, usersController.whoami);

    //loan routes
    app.post(urls.loans.apply, loansController.apply);
    app.get(urls.loans.apply, loansController.applyPage);

    //invoice routes
    app.get(urls.invoices.summary(':invoiceid'), middleware.setMerchantContext, loansController.invoiceSummary);
    app.get(urls.invoices.details(':invoiceid'), middleware.setMerchantContext, loansController.invoiceDetails);
    app.get(urls.invoices.pay(':invoiceid'), middleware.setMerchantContext, loansController.invoicePayPage);
    app.post(urls.invoices.portal, loansController.invoicePortal);

    //merchant routes
    app.get(urls.merchants.overview, middleware.setMerchantContext, merchantsController.overview);
    app.get(urls.merchants.invoices, middleware.setMerchantContext, merchantsController.invoices);
    app.get(urls.merchants.settings, middleware.setMerchantContext, merchantsController.settings);
    app.get(urls.merchants.loans, middleware.setMerchantContext, loansController.merchantLoans);
  },
  urls: urls
}

