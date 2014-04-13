var nforce = require('nforce');
var _ = require('underscore');

var org = nforce.createConnection({
  clientId: '3MVG9JZ_r.QzrS7hBs6l2_L90yg2aBGSO72D1a_uGF0aPCkMIv7.Ef6Xaoow6oQVIi9.uu5VS7i1ULjWkMZ8y',
  clientSecret: '4842824259730235377',
  redirectUri: 'http://localhost:3000/oauth/_callback',
  environment: 'production',  // optional, salesforce 'sandbox' or 'production', production default
  mode: 'single' // optional, 'single' or 'multi' user mode, multi default
});


module.exports = {
  createLoanApp: function(id, firstName, lastName, address, city, state, zipCode, phone, lastFour, amount, ipAddress, callback) {
    org.authenticate({ username: 'jeff_trial@tabb.io', password: 'Welcome1', securityToken: 'l3o99Vq6Tdww3R9BCWV5mN3A3'}, function(error, response){
      var loan = {
        'Loan_Application__c': {
          'attributes' : {
            'type' : 'payday__Loan_Application__c'
          },
          'payday__Loan_Amount__c' : amount,
          'payday__Product_Type__c': 'Installment',
          'payday__Lead_Source__c': 'tabb.io',
          'payday__IP_Address__c' : ipAddress,
          'Loan_ID__c' : id
        },
        'Contact__r' : {
          'attributes' : {
            'type' : 'Contact'
          },
          'MailingState' : state,
          'MailingCity' : city,
          'MailingStreet' : address,
          'MailingPostalCode' : zipCode,
          'FirstName' : firstName,
          'payday__Social_Security_Number__c' : lastFour,
          'MobilePhone' : phone,
          'LastName' : lastName
        }
      };

      org.apexRest({uri: 'services/apexrest/payday/insertLoanApplication', method: 'POST', body: JSON.stringify(loan) }, function(error, response){
        callback(error, response)
      });
    });
  },

  queryByPhone: function(phone, callback) {
    var query = 'SELECT id, payday__Loan_Amount__c, payday__Lead_Source__c, CreatedDate FROM payday__Loan_Application__c WHERE payday__Contact__r.MobilePhone=\'' + phone + '\'';
    org.authenticate({ username: 'jeff_trial@tabb.io', password: 'Welcome1', securityToken: 'l3o99Vq6Tdww3R9BCWV5mN3A3'}, function(error, response){
      org.query({query: query}, function(error, results) {
        if (!error) {
          callback(null, _.map(results.records, function(record){return {
            id: record._fields.id,
            loanAmount: record._fields.payday__loan_amount__c,
            createdDate: record._fields.createddate
          }}))
        }
        else {
          console.log("Error retreiving records from Salesforce!");
          callback(error, null);
        }
      });
    });
  },

  queryById: function(id, callback) {
    var query = 'SELECT id, payday__Loan_Amount__c, payday__First_Payment_Date__c, payday__Monthly_Payment_Amount__c, CreatedDate, payday__Contact__r.MobilePhone FROM payday__Loan_Application__c WHERE Loan_ID__c=\'' + id + '\'';
    org.authenticate({ username: 'jeff_trial@tabb.io', password: 'Welcome1', securityToken: 'l3o99Vq6Tdww3R9BCWV5mN3A3'}, function(error, response){
      org.query({query: query}, function(error, results) {
        if (!error) {
          callback(null, _.map(results.records, function(record){return {
            id: id,
            loanAmount: record._fields.payday__loan_amount__c,
            createdDate: record._fields.createddate,
            paymentAmount: record._fields.payday__monthly_payment_amount__c,
            paymentDueDate: record._fields.payday__first_payment_date__c,
            phone: record._fields.payday__contact__r.MobilePhone
          }})[0]);
        }
        else {
          console.log("Error retreiving records from Salesforce!");
          callback(error, null);
        }
      });
    });
  }
}
