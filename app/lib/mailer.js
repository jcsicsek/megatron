var mandrill = require('node-mandrill')('jBA7ACAJtD57C0-9Eu5eIg');
var toAddress = "hello@tabb.io";
var toName = "Contact tabb.io";
var fromAddress = "contact@tabb.io";

module.exports = {
  contactUs: function(contactAddress, name, message, callback) {
    mandrill('/messages/send', {
        message: {
            to: [{email: toAddress, name: toName}],
            from_email: contactAddress,
            subject: "Contact Us form",
            text: "Customer Email: " + contactAddress + "\nCustomer Name: " + name + "\nCustomer Message:\n" + message
        }
    }, function(error, response)
    {
        callback(error, response);
    });
  },

  apiRequest: function(contactAddress, name, companyName, companyAddress, phone, message, callback) {
      mandrill('/messages/send', {
          message: {
              to: [{email: toAddress, name: toName}],
              from_email: contactAddress,
              subject: "API Request form",
              text: "Customer Email: " + contactAddress +
                "\nCustomer Name: " + name +
                "\nCompany Name: " + companyName +
                "\nCompany Address: " + companyAddress +
                "\nPhone: " + phone +
                "\nCustomer Message:\n" + message
          }
      }, function(error, response)
      {
          callback(error, response);
      });
    }
}
