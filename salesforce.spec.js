var sf = require('./app/lib/salesforce');



describe('Salesforce wrapper', function() {
  this.timeout(5000);
	it('opens a new loan application', function(done) {
		var app = {
			firstName: "Dutch",
			lastName: "Ruppersberger",
			address: "123 Fake St",
			city: "Annapolis",
			state: "MD",
			zipCode: "21401",
			phone: "4105555555",
			lastFour: "1234",
      amount: "1000",
			ipAddress: "127.0.0.1"
		}
		sf.createLoanApp(app.firstName, app.lastName, app.address, app.city, app.state, app.zipCode, app.phone, app.lastFour, app.amount, app.ipAddress, function(error, response) {
			console.log(error, response);
			done();
		});
	});

  it('queries loan applications by phone number', function(done) {
    var phone = "4105555555";
    sf.queryByPhone(phone, function(error, results) {
      console.log(error, results);
      done();
    });
  });
});
