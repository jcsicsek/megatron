var sf = require('../lib/salesforce');

function generateId(length)
{
  var id = "";
  var chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

  for(var i = 0; i < length; i++) {
    id += chars.charAt(Math.floor(Math.random() * chars.length));
  }

  return id;
}

module.exports.create = function() {
  var self = {   
    apply: function(req, res) {
      var loan = req.body;
    	sf.createLoanApp(generateId(4), loan.firstName, loan.lastName, loan.address1 + " " + loan.address2, loan.city, loan.state, loan.zipCode, loan.phone, loan.lastFour, loan.amount, req.ip, function(error, response) {
        if (!error) {
          res.send({status: "success", response: response});
        } else {
          res.send(500, {status: "error", error: error});
        }
      });
    },
    applyPage: function(req, res) {
      res.render('loans/apply.html', {});
    },
    invoiceSummary: function(req, res) {
      sf.queryById(req.params.invoiceid, function(error, loan) {
        res.render('manage/consumer/invoicesummary.html', {title: "Invoice | tabb.io", loan: loan});    
      })
    },
    invoiceDetails: function(req, res) {
      res.render('manage/consumer/invoicedetail.html', {title: "Statements | tabb.io"});
    },
    invoicePayPage: function(req, res) {
      res.render('manage/consumer/pay.html', {title: "Make a Payment | tabb.io"});
    }
  };
  return self;
}
