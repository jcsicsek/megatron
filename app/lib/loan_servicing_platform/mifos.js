var logger = require('winston');
var HashIds = require('hashids');
var _ = require('underscore');
var loanOrigination = require('../loan_origination');
var mifosApi = require('../mifos_api');

var hashids = new HashIds('poop', 4);

var getOrCreateClientId = function(firstName, lastName, phone, callback) {
  mifosApi.getClientId(phone, function(error, clientId) {
    if (clientId) {
      logger.info("MIFOS WRAPPER: Client with phone", phone, "already exists and has id", clientId);
      callback(error, clientId);
    } else {
      logger.info("MIFOS WRAPPER: Client with phone", phone, "does not exist.  Creating...");
      mifosApi.createClient(firstName, lastName, phone, callback);
    }
  })
}


module.exports = {

  createLoanApp: function(loanProductId, merchantId, firstName, lastName, address, city, state, zipCode, phone, lastFour, amount, ipAddress, callback) {
    mifosApi.getLoanProduct(loanProductId, function(error, loanProduct) {
      getOrCreateClientId(firstName, lastName, phone, function(error, clientId) {
        mifosApi.createLoanApp(clientId, merchantId, loanProduct, amount, function(error, loanAppResponse){
          loanOrigination.decideApproval(firstName, lastName, address, city, state, zipCode, phone, lastFour, amount, ipAddress, function(error, decision) {
            if (decision) {
              mifosApi.approveLoan(loanAppResponse.loanId, function(error, results) {
                mifosApi.disburseLoan(loanAppResponse.loanId, function(error, results) {
                  callback(error, {id: hashids.encrypt(loanAppResponse.loanId), approved: true});
                })
              })
            } else {
              mifosApi.rejectLoan(loanAppResponse.loanId, function(error, results) {
                callback(error, {id: hashids.encrypt(loanAppResponse.loanId), approved: false});
              })
            }
          })
        })
      })
    })
  },

  queryById: function(id, callback) {
    logger.info("MIFOS: querying summary for loan with id", id);
    var mifosLoanId = hashids.decrypt(id);
    mifosApi.getLoan(mifosLoanId, function(error, loan) {
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

  queryByMerchant: function(merchantId, callback) {
    logger.info("MIFOS: querying for loans by merchant id ", merchantId);
    mifosApi.getLoansByPurposeId(merchantId, function(error, loans) {
      callback(error, _.map(loans.pageItems, function(loan){return {
        id: hashids.encrypt(loan.id),
        loanAmount: loan.principal,
        createdDate: new Date(loan.timeline.submittedOnDate[0], loan.timeline.submittedOnDate[1], loan.timeline.submittedOnDate[2]),
        paymentAmount: loan.repaymentSchedule ? loan.repaymentSchedule.periods[1].totalDueForPeriod : 0,
        paymentDueDate: loan.repaymentSchedule ? (new Date(loan.repaymentSchedule.periods[1].dueDate[0], loan.repaymentSchedule.periods[1].dueDate[1], loan.repaymentSchedule.periods[1].dueDate[2])) : new Date(),
        phone: "4105555555",
        name: loan.clientName,
        merchant: loan.oanPurposeName
      }}));
    });
  },
  addMerchant: function(merchantSlug, callback) {
    logger.info("MIFOS:  Adding merchant with slug", merchantSlug);
    mifosApi.getCodesList(function(error, codesList) {
      var loanPurposeCodeId = _.find(codesList, function(code) {return code.name == 'LoanPurpose'}).id;
      mifosApi.addCodeValue(loanPurposeCodeId, merchantSlug, function(error, codeValueAddResults) {
        callback(error, codeValueAddResults.subResourceId);
      });
    });
  }
}
