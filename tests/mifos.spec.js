var mifos = require('../app/lib/loan_servicing_platform/mifos');

var loanProductId = 1;

describe('Mifos wrapper', function() {
  this.timeout(5000);
	xit('opens a new loan application for a new client', function(done) {
		var app = {
			firstName: "Dutch",
			lastName: "Ruppersberger",
			address: "123 Fake St",
			city: "Annapolis",
			state: "MD",
			zipCode: "21401",
			phone: Math.floor(Math.random() * 10000000000),
			lastFour: "1234",
      		amount: "1000",
			ipAddress: "127.0.0.1",
      merchantId: 26
		}
		mifos.createLoanApp(loanProductId, 26, app.firstName, app.lastName, app.address, app.city, app.state, app.zipCode, app.phone, app.lastFour, app.amount, app.ipAddress, function(error, response) {
			console.log(error, response);
			done();
		});
	});

  xit('opens a new loan application for an existing client', function(done) {
    var app = {
      firstName: "Dutch",
      lastName: "Ruppersberger",
      address: "123 Fake St",
      city: "Annapolis",
      state: "MD",
      zipCode: "21401",
      phone: "4104555555",
      lastFour: "1234",
          amount: "1000",
      ipAddress: "127.0.0.1",
      merchantId: 26
    }
    mifos.createLoanApp(loanProductId, 26, app.firstName, app.lastName, app.address, app.city, app.state, app.zipCode, app.phone, app.lastFour, app.amount, app.ipAddress, function(error, response) {
      console.log(error, response);
      done();
    });
  });

  xit('queries a single loan application by id', function(done) {
    var id = 'jkqg';
    mifos.queryById(id, function(error, results) {
      console.log(error, results);
      done();
    });
  });

  xit('adds a new merchant into the system', function(done) {
    mifos.addMerchant("test-merchant-" + Math.floor(Math.random() * 10000000000), function(error, merchantId) {
      console.log(error, merchantId);
      done();
    });
  });

  xit('queries loans by merchant', function(done) {
    var merchantId = 26;
    mifos.queryByMerchant(merchantId, function(error, results) {
      console.log(error, results);
      done();
    });
  });

  xit('approves a loan', function(done) {
    var loanId = 14;
    mifos.approveLoan(loanId, function(error, results) {
      console.log(error, results);
      done();
    })
  })

  it('rejects a loan', function(done) {
    var loanId = 12;
    mifos.rejectLoan(loanId, function(error, results) {
      console.log(error, results);
      done();
    })
  })
});
