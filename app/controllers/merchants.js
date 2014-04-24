var sf = require('../lib/salesforce');

module.exports.create = function() {
  var self = {   
    overview: function(req, res) {
      sf.queryByMerchant(req.subdomains[0], function(error, loans) {
        res.render('manage/merchant/overview', { title: "Your Store Overview | tabb.io", loans: loans });
      });
    },
    invoices: function(req, res) {
      sf.queryByMerchant(req.subdomains[0], function(error, loans) {
        res.render('manage/merchant/invoices', { title: "Your Store Invoices | tabb.io", loans: loans });
      });
    },
    settings: function(req, res) {
      res.render('manage/merchant/settings', { title: "Your Store Settings | tabb.io" });
    }
  };
  return self;
}
