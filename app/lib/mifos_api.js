var request = require("request");
var config = require('../config');
var dateFormat = require('dateFormat');
var logger = require('winston');


//ignore broken ssl on mifos
process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0';

module.exports = {

  getClientId: function(phone, callback) {
    logger.info("MIFOS API: Looking up client with phone number", phone);
    var options = {
      url: config.mifos.url + 'clients',
      auth: {
        user: config.mifos.username,
        pass: config.mifos.password,
        sendImmediately: true
      },
      qs: {
        tenantIdentifier: config.mifos.tenantIdentifier,
        sqlSearch: "c.mobile_no='" + phone + "'"
      }
    }
    request.get(options, function(error, response, body) {
      var clients = JSON.parse(body);
      if (clients.totalFilteredRecords == 0) {
        callback(null, null);
      } else {
        callback(null, clients.pageItems[0].id);
      }
    })
  },

  getClient: function(clientId, callback) {
    logger.info("MIFOS API: Looking up client with id", clientId);
    var options = {
      url: config.mifos.url + 'clients/' + clientId,
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
      callback(error, JSON.parse(body));
    });
  },

  createClient: function(firstName, lastName, phone, callback) {
    logger.info("MIFOS API: Creating client with phone number", phone);
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
      callback(error, body.clientId);
    })
  },

  approveLoan: function(loanId, callback) {
    logger.info("MIFOS API: Approving loan with id", loanId);
    var options = {
      url: config.mifos.url + 'loans/' + loanId,
      json: {
        approvedOnDate: dateFormat(new Date(), "dd mmmm yyyy"),
        dateFormat: "dd MMMM yyyy",
        locale: "en"
      },
      auth: {
        user: config.mifos.username,
        pass: config.mifos.password,
        sendImmediately: true
      },
      qs: {
        tenantIdentifier: config.mifos.tenantIdentifier,
        command: "approve"
      }
    }
    request.post(options, function(error, response, body) {
      callback(error, body);
    })
  },

  rejectLoan: function(loanId, callback) {
    logger.info("MIFOS API: Rejecting loan with id", loanId);
    var options = {
      url: config.mifos.url + 'loans/' + loanId,
      json: {
        rejectedOnDate: dateFormat(new Date(), "dd mmmm yyyy"),
        dateFormat: "dd MMMM yyyy",
        locale: "en"
      },
      auth: {
        user: config.mifos.username,
        pass: config.mifos.password,
        sendImmediately: true
      },
      qs: {
        tenantIdentifier: config.mifos.tenantIdentifier,
        command: "reject"
      }
    }
    request.post(options, function(error, response, body) {
      callback(error, body);
    })
  },

  disburseLoan: function(loanId, callback) {
    logger.info("MIFOS API: Disbursing loan with id", loanId);
    var options = {
      url: config.mifos.url + 'loans/' + loanId,
      json: {
        actualDisbursementDate: dateFormat(new Date(), "dd mmmm yyyy"),
        dateFormat: "dd MMMM yyyy",
        locale: "en"
      },
      auth: {
        user: config.mifos.username,
        pass: config.mifos.password,
        sendImmediately: true
      },
      qs: {
        tenantIdentifier: config.mifos.tenantIdentifier,
        command: "disburse"
      }
    }
    request.post(options, function(error, response, body) {
      callback(error, body);
    })
  },

  getLoanProduct: function(loanProductId, callback) {
    logger.info("MIFOS API: pulling down loan product with id ", loanProductId);
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
      callback(error, JSON.parse(body));
    })
  },

  createLoanApp: function(clientId, merchantId, loanProduct, amount, callback) {
    logger.info("MIFOS API: Creating loan for client with id", clientId, "for amount of", amount);
    var loan = {
      loanType: "individual",
      clientId: clientId,
      productId: loanProduct.id,
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
      locale: "en",
      loanPurposeId: merchantId
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
      callback(error, body);
    })
  },

  getLoan: function(id, callback) {
    logger.info("MIFOS API: querying summary for loan with id", id);
    var options = {
      url: config.mifos.url + 'loans/' + id,
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
      callback(error, JSON.parse(body));
    });
  },

  getLoansByPurposeId: function(id, callback) {
    logger.info("MIFOS API: querying for loans by purpose id ", id);

    var options = {
      url: config.mifos.url + 'loans',
      auth: {
        user: config.mifos.username,
        pass: config.mifos.password,
        sendImmediately: true
      },
      qs: {
        tenantIdentifier: config.mifos.tenantIdentifier,
        sqlSearch: 'loanpurpose_cv_id=' + id,
        associations: 'repaymentSchedule'
      }
    }

    request.get(options, function(error, response, body) {
      callback(error, JSON.parse(body));
    });
  },

  getCodesList: function(callback) {
    logger.info("MIFOS API:  Getting list of all codes");
    var options = {
      url: config.mifos.url + 'codes',
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
      callback(error, JSON.parse(body));
    });
  },

  addCodeValue: function(codeId, value, callback) {
    logger.info("MIFOS API: Adding code value", value, "to code with id", codeId);
    var options = {
      url: config.mifos.url + 'codes/' + codeId + '/codevalues',
      json: {
        name: value
      },
      auth: {
        user: config.mifos.username,
        pass: config.mifos.password,
        sendImmediately: true
      },
      qs: {
        tenantIdentifier: config.mifos.tenantIdentifier
      }
    }
    request.post(options, function(error, results, body) {
      callback(error, body);
    });
  },

  makeRepayment: function(loanId, amount, callback) {
    logger.info("MIFOS API: Making loan repayment to loan with id", loanId, "in the amount of", amount);
    var options = {
      url: config.mifos.url + 'loans/' + loanId + '/transactions',
      json: {
        transactionAmount: amount,
        locale: "en",
        transactionDate: dateFormat(new Date(), "dd mmmm yyyy"),
        dateFormat: "dd MMMM yyyy"
      },
      auth: {
        user: config.mifos.username,
        pass: config.mifos.password,
        sendImmediately: true
      },
      qs: {
        tenantIdentifier: config.mifos.tenantIdentifier,
        command: "repayment"
      }
    }
    request.post(options, function(error, results, body) {
      callback(error, body);
    });
  }
}
