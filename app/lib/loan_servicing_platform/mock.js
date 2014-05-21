var logger = require('winston');

module.exports = {
  createLoanApp: function(id, merchant, firstName, lastName, address, city, state, zipCode, phone, lastFour, amount, ipAddress, callback) {
    logger.info("MOCK PLATFORM: creating loan application for id", id);
    callback(null, {id: id})
  },

  queryByPhone: function(phone, callback) {
    logger.info("MOCK PLATFORM: quering all loans with phone number", phone);
    callback(null, [
      {
        id: "ABCD",
        loanAmount: 10000,
        createdDate: new Date()
      },
      {
        id: "EFGH",
        loanAmount: 20000,
        createdDate: new Date()
      },
      {
        id: "IJKL",
        loanAmount: 30000,
        createdDate: new Date()
      }
    ])
  },

  queryById: function(id, callback) {
    logger.info("MOCK PLATFORM: querying summary for loan with id", id);
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

  queryByMerchant: function(merchant, callback) {
    logger.info("MOCK PLATFORM: querying for loans by merchant ", merchant);
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
