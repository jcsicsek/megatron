var sf = require('../lib/salesforce');

module.exports.create = function() {
  var self = {   
    apply: function(req, res) {
      var loan = req.body;
    	sf.createLoanApp(loan.firstName, loan.lastName, loan.address1 + " " + loan.address2, loan.city, loan.state, loan.zipCode, loan.phone, loan.lastFour, loan.amount, req.ip, function(error, response) {
        if (!error) {
          res.send({status: "success", response: response});
        } else {
          res.send(500, {status: "error", error: error});
        }
      });
    },
    applyPage: function(req, res) {
      res.render('loans/apply.html', {});
    }
  };
  return self;
}
