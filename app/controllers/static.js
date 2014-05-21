var mailer = require('../lib/mailer');

module.exports.create = function() {
  var self = {   
    root: function(req, res) {
      res.render('front-end/index', { title: "tabb.io | Plug and Play Private Label Credit" });
    },
    company: function(req, res) {
      res.render('front-end/company', { title: "About the Company | tabb.io" });
    },
    products: function(req, res) {
      res.render('front-end/products', { title: "Products | tabb.io" });
    },
    api: function(req, res) {
      res.render('front-end/api/index', { title: "API Overview | tabb.io" });
    },
    apiapply: function(req, res) {
      res.render('front-end/api/apply', { title: "Apply for API | tabb.io" });
    },
    apiloanrequest: function(req, res) {
      res.render('front-end/api/loanrequest', { title: "Create Loan Request | tabb.io" });
    },
    faqs: function(req, res) {
      res.render('front-end/faqs', { title: "Frequently Asked Questions | tabb.io" });
    },
    terms: function(req, res) {
      res.render('front-end/terms', { title: "Terms & Conditions | tabb.io" });
    },
    privacy: function(req, res) {
      res.render('front-end/privacy', { title: "Privacy Policy | tabb.io" });
    },
    contact: function(req, res) {
      res.render('front-end/contact', { title: "Contact Our Team | tabb.io" });     
    },
    sendContact: function(req, res) {
      mailer.contactUs(req.body.email, req.body.name, req.body.message, function(error, response) {
        res.send({status: "success", message: "Message Sent"});
      });
    },
    sendApiRequest: function(req, res) {
      mailer.apiRequest(req.body.email, req.body.name, req.body.cname, req.body.caddress, req.body.phone, req.body.message, function(error, response) {
        res.send({status: "success", message: "API Request Received"});
      });
    }
  };
  return self;
}
