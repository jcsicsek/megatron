var logger = require('winston');
var HashIds = require('hashids');
var request = require("request");
var config = require('../config');
var dateFormat = require('dateFormat');

var hashids = new HashIds('poop', 4);

process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0';

module.exports = {
  createLoanApp: function(loanProductId, merchant, firstName, lastName, address, city, state, zipCode, phone, lastFour, amount, ipAddress, callback) {
    logger.info("MIFOS: pulling down loan product with id ", loanProductId);
    var options = {
      url: config.mifos.url + 'loanproducts/' + loanProductId,
      auth: {
        user: config.mifos.username,
        pass: config.mifos.password,
        sendImmediately: true
      },
      qs: {
        tenantIdentifier: config.mifos.tenantIdentifier
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
        url: config.mifos.url + 'clients',
        json: client,
        auth: {
          user: config.mifos.username,
          pass: config.mifos.password,
          sendImmediately: true
        },
        qs: {
          tenantIdentifier: config.mifos.tenantIdentifier
        }
      }
      request.post(options, function(error, response, body) {
        var clientId = body.clientId;
        var loan = {
          loanType: "individual",
          clientId: clientId,
          productId: loanProductId,
          principal: amount,
          //TODO:  Hardcoded
          loanTermFrequency: 52,
          loanTermFrequencyType: loanProduct.repaymentFrequencyType.id,
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
          url: config.mifos.url + 'loans',
          json: loan,
          auth: {
            user: config.mifos.username,
            pass: config.mifos.password,
            sendImmediately: true
          },
          qs: {
            tenantIdentifier: config.mifos.tenantIdentifier
          }
        }
        request.post(options, function(error, response, body) {
          console.log(body);
          callback(null, {id: hashids.encrypt(body.loanId)});
        })
      })
    })
  },

  //TODO:  Stubbed
  queryById: function(id, callback) {
    logger.info("MIFOS: querying summary for loan with id", id);
    var mifosLoanId = hashids.decrypt(id);
    var options = {
      url: config.mifos.url + 'loans/' + mifosLoanId,
      auth: {
        user: config.mifos.username,
        pass: config.mifos.password,
        sendImmediately: true
      },
      qs: {
        tenantIdentifier: config.mifos.tenantIdentifier,
        associations: 'repaymentSchedule'
      }
    }
    request.get(options, function(error, response, body) {
      var loan = JSON.parse(body);

      callback(null, {
        id: id,
        loanAmount: loan.principal,
        createdDate: new Date(loan.timeline.submittedOnDate[0], loan.timeline.submittedOnDate[1], loan.timeline.submittedOnDate[2]),
        //TODO:  Identify the next period
        paymentAmount: loan.repaymentSchedule.periods[1].totalDueForPeriod,
        paymentDueDate: new Date(loan.repaymentSchedule.periods[1].dueDate[0], loan.repaymentSchedule.periods[1].dueDate[1], loan.repaymentSchedule.periods[1].dueDate[2]),
        //TODO:  Pull in client detail to get phone number
        phone: "4105555555",
        name: loan.clientName,
        //TODO:  Merchant Info
        merchant: "tabbio"
      });
    })
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
