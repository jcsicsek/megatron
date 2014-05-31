var mifos = require('../app/lib/loan_servicing_platform/mifos');
var loanAnalytics = require('../app/lib/loan_analytics');

describe('Mifos API', function() {
  this.timeout(5000);

  it('sorts loans into date buckets', function(done) {
    var merchantSlug = 'mifostest';
    mifos.queryByMerchant(merchantSlug, function(error, loans) {
      var loansInBuckets = loanAnalytics.dailyData(loans, 20);
      console.log(loansInBuckets);
      done();
    })
  })
});
