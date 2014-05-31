var mifos = require('../app/lib/loan_servicing_platform/mifos');
var loanAnalytics = require('../app/lib/loan_analytics');

var loans;

describe('Mifos API', function() {
  this.timeout(5000);

  before(function(done) {
    var merchantSlug = 'mifostest';
    mifos.queryByMerchant(merchantSlug, function(error, results) {
      loans = results;
      done();
    });
  });

  it('sorts loans into date buckets', function(done) {
    var loansInBuckets = loanAnalytics.dailyData(loans, 20);
    console.log(loansInBuckets);
    done();
  });

  it('gets todays loan data', function(done) {
    var todaysData = loanAnalytics.todaySummary(loans);
    console.log(todaysData);
    done();
  });

  it('calculates number of loans per day', function(done) {
    var loansPerDay = loanAnalytics.loansPerDay(loans, 20);
    console.log(loansPerDay);
    done();
  });

  it('calculates total amount of money from loans per day', function(done) {
    var loanValuePerDay = loanAnalytics.loansValuePerDay(loans, 20);
    console.log(loanValuePerDay);
    done();
  });

  it('calculates cumulative stats', function(done) {
    var stats = loanAnalytics.cumulativeStats(loans, 20);
    console.log(stats);
    done();
  });
});
