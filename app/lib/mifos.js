var logger = require('winston');
var HashIds = require('hashids');
var hashids = new HashIds('poop');
var request = require("request");
var config = require('../config');
var dateFormat = require('dateFormat');

process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0';

module.exports = {
  createLoanApp: function(loanProductId, merchant, firstName, lastName, address, city, state, zipCode, phone, lastFour, amount, ipAddress, callback) {
    logger.info("MIFOS: pulling down loan product with id ", loanProductId);
    var options = {
      url: config.mifos.url + 'loanproducts/' + loanProductId + '?tenantIdentifier=' + config.mifos.tenantIdentifier,
      auth: {
        user: config.mifos.username,
        pass: config.mifos.password,
        sendImmediately: true
      }
    }
    request.get(options, function(error, response, body) {
      var loanProduct = JSON.parse(body);
      logger.info("MIFOS: creating client for phone ", phone);
      var client = {
        firstname: firstName,
        lastname: lastName,
        officeId: config.mifos.officeId,
        active: true,
        activationDate: dateFormat(new Date(), "dd mmmm yyyy"),
        dateFormat: "dd MMMM yyyy",
        mobileNo: phone,
        locale: "en"
      }
      var options = {
        url: config.mifos.url + 'clients?tenantIdentifier=' + config.mifos.tenantIdentifier,
        json: client,
        auth: {
          user: config.mifos.username,
          pass: config.mifos.password,
          sendImmediately: true
        }
      }
      request.post(options, function(error, response, body) {
        var clientId = body.clientId;
        var loan = {
          loanType: 1,
          clientId: clientId,
          productId: loanProductId,
          principal: amount,
          //TODO:  Hardcoded
          loanTermFrequency: 12,
          loanTermFrequencyType: 1,
          //end hardcoded
          numberOfRepayments: loanProduct.numberOfRepayments,
          repaymentEvery: loanProduct.repaymentEvery,
          repaymentFrequencyType: loanProduct.repaymentFrequencyType.id,
          interestRatePerPeriod: loanProduct.interestRatePerPeriod,
          amortizationType: loanProduct.amortizationType.id,
          interestType: loanProduct.interestType.id,
          interestCalculationPeriodType: loanProduct.interestCalculationPeriodType.id,
          transactionProcessingStrategyId: loanProduct.transactionProcessingStrategyId,
          expectedDisbursementDate: dateFormat(new Date(), "dd mmmm yyyy"),
          submittedOnDate: dateFormat(new Date(), "dd mmmm yyyy"),
          dateFormat: "dd MMMM yyyy",
          locale: "en"
        }
        var options = {
          url: config.mifos.url + 'loans?tenantIdentifier=' + config.mifos.tenantIdentifier,
          json: loan,
          auth: {
            user: config.mifos.username,
            pass: config.mifos.password,
            sendImmediately: true
          }
        }
        request.post(options, function(error, response, body) {
          console.log(error, response, body);
          callback(null, {id: hashids.encrypt(body.loanId)});
        })
      })
    })
  },

  //TODO:  Stubbed
  queryById: function(id, callback) {
    logger.info("SALESFORCE MOCK: querying summary for loan with id", id);
    callback(null, {
      id: id,
      loanAmount: 10000,
      createdDate: new Date(),
      paymentAmount: 5000,
      paymentDueDate: new Date(),
      phone: "4105555555",
      name: "Dutch Ruppersberger",
      merchant: "mock"
    });
  },

  //TODO:  Stubbed
  queryByMerchant: function(merchant, callback) {
    logger.info("SALESFORCE MOCK: querying for loans by merchant ", merchant);
    callback(null, [
      {
        id: "ABCD",
        loanAmount: 10000,
        createdDate: new Date(),
        paymentAmount: 5000,
        paymentDueDate: new Date(),
        phone: "4105555555",
        name: "Dutch Ruppersberger",
        firstName: "Dutch",
        lastName: "Ruppersberger",
        merchant: "mock",
        //TODO:  Hardcoded loan status!
        status: "Approved"
      },
      {
        id: "EFGH",
        loanAmount: 20000,
        createdDate: new Date(),
        paymentAmount: 6000,
        paymentDueDate: new Date(),
        phone: "4102222222",
        name: "Habit Neige",
        firstName: "Habit",
        lastName: "Neige",
        merchant: "mock",
        //TODO:  Hardcoded loan status!
        status: "Approved"
      },
      {
        id: "IJKL",
        loanAmount: 30000,
        createdDate: new Date(),
        paymentAmount: 7000,
        paymentDueDate: new Date(),
        phone: "4103333333",
        name: "Addy Roxy",
        firstName: "Addy",
        lastName: "Roxy",
        merchant: "mock",
        //TODO:  Hardcoded loan status!
        status: "Approved"
      }
    ]);
  }
}
