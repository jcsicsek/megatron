var request = require('supertest');
app = require('../app/server');

describe('Loan API', function() {
  this.timeout(10000);
	it('opens a new loan application', function(done) {
		var loanApplication = {
			firstName: "Dutch",
			lastName: "Ruppersberger",
			address1: "123 Fake St",
      address2: "Suite 300",
			city: "Annapolis",
			state: "MD",
			zipCode: "21401",
			phone: "4105555555",
			lastFour: "1234",
      amount: "1000"
		}
    request(app)
      .post('/loans/apply')
      .send(loanApplication)
      .expect(200)
      .end(function(error, res) {
        console.log(res);
        done();
      });
	});
});
