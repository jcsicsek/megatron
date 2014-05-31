var loanPlatform = require('../lib/loan_servicing_platform');
var _ = require('underscore');
var loanAnalytics = require('../lib/loan_analytics');
var dateFormat = require('dateformat');

module.exports.create = function() {
  var self = {   
    overview: function(req, res) {
      loanPlatform.queryByMerchant(req.subdomains[0], function(error, loans) {
        loansByDate = loanAnalytics.dailyData(loans, 7);
        var loanCountPerDay = _.map(loansByDate, function(day) {return {day: dateFormat(day.date, "yyyy-mm-dd"), v: day.loans.length}});
        res.render('manage/merchant/overview', {
          title: "Your Store Overview | tabb.io",
          loans: loans.reverse(),
          totalRevenue: _.reduce(loans, function(memo, loan) {return memo + loan.loanAmount}, 0).toFixed(0),
          totalTransactions: loans.length,
          acceptancePercent: (_.where(loans, {status: "Approved"}).length / loans.length * 100).toFixed(0),
          totalCustomers: _.uniq(loans, function(loan) {return loan.phone}).length,
          loanCountPerDay: loanCountPerDay
        });
      });
    },
    invoices: function(req, res) {
      loanPlatform.queryByMerchant(req.subdomains[0], function(error, loans) {
        res.render('manage/merchant/invoices', { title: "Your Store Invoices | tabb.io", loans: loans });
      });
    },
    settings: function(req, res) {
      res.render('manage/merchant/settings', { title: "Your Store Settings | tabb.io" });
    }
  };
  return self;
}
