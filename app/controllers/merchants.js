module.exports.create = function() {
  var self = {   
    overview: function(req, res) {
      res.render('manage/merchant/overview', { title: "Your Store Overview | tabb.io" });
    },
    invoices: function(req, res) {
      res.render('manage/merchant/invoices', { title: "Your Store Invoices | tabb.io" });
    },
    settings: function(req, res) {
      res.render('manage/merchant/settings', { title: "Your Store Settings | tabb.io" });
    }
  };
  return self;
}
