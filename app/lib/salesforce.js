var nforce = require('nforce');

// var org = nforce.createConnection({
//   clientId: '3MVG9JZ_r.QzrS7gICAK6VrIV5emkHrz58gx9OcgUHBmTrJ5F0qw7j4vE6sNL5TJz3.ip6.6t5yveqLHYZMhP',
//   clientSecret: '8433870638432819597',
//   redirectUri: 'http://localhost:3000/oauth/_callback',
//   apiVersion: 'v29.0',  // optional, defaults to current salesforce API version
//   environment: 'production',  // optional, salesforce 'sandbox' or 'production', production default
//   mode: 'single' // optional, 'single' or 'multi' user mode, multi default
// });

var org = nforce.createConnection({
  clientId: '3MVG9A2kN3Bn17hsqUREORTK39yiKQO2pbNMRPkaPOfd5YUCHpqGT3glww8SJyg1hjIySrOSbGtTBTuwipKBc',
  clientSecret: '8868983491936129853',
  redirectUri: 'http://localhost:3000/oauth/_callback',
  //apiVersion: 'v29.0',  // optional, defaults to current salesforce API version
  environment: 'production',  // optional, salesforce 'sandbox' or 'production', production default
  mode: 'single' // optional, 'single' or 'multi' user mode, multi default
});

module.exports = {
  createLoan: function(callback) {
    org.authenticate({ username: 'jcsicsek@gmail.com', password: 'Woxn2938', securityToken: 'NSSdlnJzDoiVcJfxmDI2yqjdB'}, function(error, response){
      console.log(error, response);
      // the oauth object was stored in the connection object
      var loan = nforce.createSObject('Loan__c');
      loan.set('Name', 'Poopy Loan');
      loan.set('Address_1__c', '123 Fake St');
      loan.set('Address_2__c', 'Apt 1F');
      loan.set('City__c', 'Fakeville');
      loan.set('First_Name__c', 'Abby');
      loan.set('Last_4_SSN__c', '5555');
      loan.set('Last_Name__c', 'de Neige');
      loan.set('Phone__c', '4105555555');
      loan.set('State__c', 'NY');
      loan.set('Zip__c', '11211');

      org.insert({ sobject: loan }, function(error, response){
        if(!error) console.log('It worked!');
        callback(error, response)
      });
    });
  }
}