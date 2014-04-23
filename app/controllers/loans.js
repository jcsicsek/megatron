var sf = require('../lib/salesforce');
var config = require('../config');
var twilio = require('twilio')(config.twilio.account_sid, config.twilio.auth_token);


//TODO:  Hardcoded days until loan due
var paymentDueDays = 45;


var isAuthenticated = function(req, loan) {
  if (req.session && req.session.phone && req.session.phone == loan.phone) {
    return true;
  } else {
    return false;
  }
}

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
      var merchant = req.subdomains.length > 0 ? req.subdomains[0] : "tabbio";
      var phone = loan.phone.replace(/\D/g,'');
      var loanId = generateId(4);
    	sf.createLoanApp(loanId, merchant, loan.firstName, loan.lastName, loan.address1 + " " + loan.address2, loan.city, loan.state, loan.zipCode, phone, loan.lastFour, loan.amount, req.ip, function(error, response) {
        if (!error) {
          var smsMessage = "Your $" + loan.amount + " purchase at " + merchant + " is approved! Check your statement at " + merchant + ".tabb.io/i/" + loanId + ". First payment due in " + paymentDueDays + " days.";
          twilio.sendMessage({to: phone, from: config.twilio.phone, body: smsMessage}, function(error, response) {if (error) console.log(error)});
          res.send({status: "success", response: response});
        } else {
          res.send(500, {status: "error", error: error});
        }
      });
    },
    applyPage: function(req, res) {
      res.render('loans/apply.html', {});
    },
    invoicePortal: function(req, res) {
      req.session.phone = req.body.phone.replace(/\D/g,'');
      res.redirect('/i/' + req.body.invoiceId);
    },
    invoiceSummary: function(req, res) {
      sf.queryById(req.params.invoiceid, function(error, loan) {
        if (!loan) {
          res.send(404, {status: "error", message: "Invoice with id " + req.params.invoiceid + " not found."})
        }
        else if (isAuthenticated(req, loan)) {
          res.render('manage/consumer/invoicesummary.html', {title: "Invoice | tabb.io", loan: loan});    
        } else {
          res.send(403, {status: "error", message: "Phone number not provided or invalid"})
        }
      });
    },
    invoiceDetails: function(req, res) {
      sf.queryById(req.params.invoiceid, function(error, loan) {
        if (!loan) {
          res.send(404, {status: "error", message: "Invoice with id " + req.params.invoiceid + " not found."})
        }
        else if (isAuthenticated(req, loan)) {
          res.render('manage/consumer/invoicedetail.html', {title: "Statements | tabb.io", loan: loan});
        } else {
          res.send(403, {status: "error", message: "Phone number not provided or invalid"})
        }
      });
    },
    invoicePayPage: function(req, res) {
      sf.queryById(req.params.invoiceid, function(error, loan) {
        if (!loan) {
          res.send(404, {status: "error", message: "Invoice with id " + req.params.invoiceid + " not found."})
        }
        else if (isAuthenticated(req, loan)) {
          res.render('manage/consumer/pay.html', {title: "Make a Payment | tabb.io", loan: loan});
        } else {
          res.send(403, {status: "error", message: "Phone number not provided or invalid"})
        }
      });
    }
  };
  return self;
}
