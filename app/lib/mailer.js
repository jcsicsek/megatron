var mandrill = require('node-mandrill')('jBA7ACAJtD57C0-9Eu5eIg');
var toAddress = "frank@tabb.io";
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
  }
}
