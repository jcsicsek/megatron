var mifos = require('../app/lib/mifos');

var loanProductId = 1;

describe('Mifos wrapper', function() {
  this.timeout(5000);
	it('opens a new loan application', function(done) {
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
			ipAddress: "127.0.0.1"
		}
		mifos.createLoanApp(loanProductId, "tabbio", app.firstName, app.lastName, app.address, app.city, app.state, app.zipCode, app.phone, app.lastFour, app.amount, app.ipAddress, function(error, response) {
			console.log(error, response);
			done();
		});
	});
});
