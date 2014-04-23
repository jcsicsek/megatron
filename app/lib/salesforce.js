var nforce = require('nforce');
var _ = require('underscore');
var config = require('../config');
var logger = require('winston');

var org = nforce.createConnection(config.salesforce.connection);


module.exports = {
  createLoanApp: function(id, merchant, firstName, lastName, address, city, state, zipCode, phone, lastFour, amount, ipAddress, callback) {
    logger.info("SALESFORCE: creating loan application for id", id);
    org.authenticate(config.salesforce.credentials, function(error, response){
      var loan = {
        'Loan_Application__c': {
          'attributes' : {
            'type' : 'payday__Loan_Application__c'
          },
          'payday__Loan_Amount__c' : amount,
          'payday__Product_Type__c': 'Installment',
          'payday__Lead_Source__c': merchant,
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
        response.id = id;
        callback(error, response)
      });
    });
  },

  queryByPhone: function(phone, callback) {
    logger.info("SALESFORCE: quering all loans with phone number", phone);
    var query = 'SELECT id, payday__Loan_Amount__c, payday__Lead_Source__c, CreatedDate FROM payday__Loan_Application__c WHERE payday__Contact__r.MobilePhone=\'' + phone + '\'';
    org.authenticate(config.salesforce.credentials, function(error, response){
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
    logger.info("SALESFORCE: querying summary for loan with id", id);
    var query = 'SELECT id, payday__Loan_Amount__c, payday__First_Payment_Date__c, payday__Monthly_Payment_Amount__c, CreatedDate, payday__Contact__r.MobilePhone, payday__Contact__r.FirstName, payday__Contact__r.LastName, payday__Lead_Source__c FROM payday__Loan_Application__c WHERE Loan_ID__c=\'' + id + '\'';
    org.authenticate(config.salesforce.credentials, function(error, response){
      org.query({query: query}, function(error, results) {
        if (!error) {
          callback(null, _.map(results.records, function(record){return {
            id: id,
            loanAmount: record._fields.payday__loan_amount__c,
            createdDate: record._fields.createddate,
            paymentAmount: record._fields.payday__monthly_payment_amount__c,
            paymentDueDate: record._fields.payday__first_payment_date__c,
            phone: record._fields.payday__contact__r.MobilePhone,
            name: record._fields.payday__contact__r.FirstName + " " + record._fields.payday__contact__r.LastName,
            merchant: record._fields.payday__Lead_Source__c
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
