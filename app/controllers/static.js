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
    support: function(req, res) {
      res.render('front-end/support', { title: "Support | tabb.io" });
    },
    faqs: function(req, res) {
      res.render('front-end/faqs', { title: "Frequently Asked Questions | tabb.io" });
    },
    contact: function(req, res) {
      res.render('front-end/contact', { title: "Contact Our Team | tabb.io" });     
    },
    sendContact: function(req, res) {
      mailer.contactUs(req.body.email, req.body.name, req.body.message, function(error, response) {
        res.send({status: "success", message: "Message Sent"});
      });
    }
  };
  return self;
}
