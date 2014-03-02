module.exports.create = function() {
  var self = {   
    root: function(req, res) {
      res.render('front-end/index', { title: "tabb.io | Plug and Play Private Label Credit" });
    },
    about: function(req, res) {
      res.render('front-end/about', { title: "About the Team | tabb.io" });
    },
    merchants: function(req, res) {
      res.render('front-end/merchants', { title: "Merchants Guide to Private Label Credit | tabb.io" });
    },
    consumers: function(req, res) {
      res.render('front-end/consumers', { title: "Consumers Guide to Store Credit | tabb.io" });   
    },
    creditLab: function(req, res) {
      res.render('front-end/credit-lab', { title: "Private Label Credit Lab | tabb.io" });     
    },
    support: function(req, res) {
      res.render('front-end/support', { title: "Support | tabb.io" });
    },
    contact: function(req, res) {
      res.render('front-end/contact', { title: "Contact Our Team | tabb.io" });     
    }
  };
  return self;
}
