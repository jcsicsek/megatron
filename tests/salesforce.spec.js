var sf = require('./app/lib/loan_servicing_platform/salesforce');

function generateId(length)
{
  var id = "";
  var chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

  for(var i = 0; i < length; i++) {
    id += chars.charAt(Math.floor(Math.random() * chars.length));
  }

  return id;
}


describe('Salesforce wrapper', function() {
  this.timeout(5000);
	xit('opens a new loan application', function(done) {
		var app = {
      id: generateId(4),
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
		sf.createLoanApp(app.id, app.firstName, app.lastName, app.address, app.city, app.state, app.zipCode, app.phone, app.lastFour, app.amount, app.ipAddress, function(error, response) {
			console.log(error, response);
			done();
		});
	});

  xit('queries loan applications by phone number', function(done) {
    var phone = "4105555555";
    sf.queryByPhone(phone, function(error, results) {
      console.log(error, results);
      done();
    });
  });

  it('queries a single loan application by id', function(done) {
    var id = 'DNHS';
    sf.queryById(id, function(error, results) {
      console.log(error, results);
      done();
    });
  });
});
