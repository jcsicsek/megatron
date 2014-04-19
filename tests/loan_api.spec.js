var request = require('supertest');
app = require('../app/server');

describe('Loan API', function() {

  this.timeout(10000);

	it('opens a new simple loan application', function(done) {
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

  xit('opens a new loan application with an itemized purchase list', function(done) {
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
      amount: "1000",
      items: [
        {
          name: "Dog",
          description: "Dumb thing with a horn and a tail",
          price: 4000,
          quantity: 2,
          sku: "1234567890"
        },
        {
          name: "Bone",
          description: "Thing that things with horns chew on",
          price: 1000,
          quantity: 3,
          sku: "9999999999"
        }
      ]
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
