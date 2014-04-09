var nforce = require('nforce');

// var org = nforce.createConnection({
  //   clientId: '3MVG9JZ_r.QzrS7gICAK6VrIV5emkHrz58gx9OcgUHBmTrJ5F0qw7j4vE6sNL5TJz3.ip6.6t5yveqLHYZMhP',
  //   clientSecret: '8433870638432819597',
  //   redirectUri: 'http://localhost:3000/oauth/_callback',
  //   apiVersion: 'v29.0',  // optional, defaults to current salesforce API version
  //   environment: 'production',  // optional, salesforce 'sandbox' or 'production', production default
  //   mode: 'single' // optional, 'single' or 'multi' user mode, multi default
  // });

  // var org = nforce.createConnection({
  //   clientId: '3MVG9A2kN3Bn17hsqUREORTK39yiKQO2pbNMRPkaPOfd5YUCHpqGT3glww8SJyg1hjIySrOSbGtTBTuwipKBc',
  //   clientSecret: '8868983491936129853',
  //   redirectUri: 'http://localhost:3000/oauth/_callback',
  //   //apiVersion: 'v29.0',  // optional, defaults to current salesforce API version
  //   environment: 'production',  // optional, salesforce 'sandbox' or 'production', production default
  //   mode: 'single' // optional, 'single' or 'multi' user mode, multi default
  // });

  var org = nforce.createConnection({
    clientId: '3MVG9JZ_r.QzrS7hBs6l2_L90yg2aBGSO72D1a_uGF0aPCkMIv7.Ef6Xaoow6oQVIi9.uu5VS7i1ULjWkMZ8y',
    clientSecret: '4842824259730235377',
    redirectUri: 'http://localhost:3000/oauth/_callback',
    //apiVersion: 'v29.0',  // optional, defaults to current salesforce API version
    environment: 'production',  // optional, salesforce 'sandbox' or 'production', production default
    mode: 'single' // optional, 'single' or 'multi' user mode, multi default
  });


  module.exports = {
    createLoan: function(callback) {
      org.authenticate({ username: 'jeff_trial@tabb.io', password: 'Welcome1', securityToken: 'l3o99Vq6Tdww3R9BCWV5mN3A3'}, function(error, response){
        console.log(error, response);
        // the oauth object was stored in the connection object
        var loan = {Loan_Application__c: {
          attributes : {
            type : "payday__Loan_Application__c"
          },
          payday__Type_Of_Employment__c : "Full Time",
          payday__Work_Address__c : "123,Baker Street",
          payday__Paycheck__c : "Direct Deposit",
          payday__Next_Pay_Date__c : "2013-09-21",
          payday__Salary_Schedule__c : "Specific Day",
          payday__ID_Number__c : "0113655492",
          payday__ID_Type__c : "Driver's License",
          payday__Second_Next_Pay_Date__c : "2013-09-22",
          payday__Bank_Account_Type__c : "Savings",
          payday__Current_Address_Dur_Year__c : 1,
          payday__Product_Type__c : "Installment",
          payday__Last_Pay_Date__c : "2013-09-19",
          payday__Payment_If_PayDay_On_Non_Biz_Day__c : "Before",
          payday__Routing_Number__c : "042000013",
          payday__Work_State__c : "NV",
          payday__Work_City__c : "Test City",
          payday__Work_Phone__c : "7024443061",
          payday__Current_Address_Dur_Month__c : 12,
          payday__Paycheck_Amount__c : 1000,
          payday__In_Bankruptcy__c : false,
          payday__Supervisor_Phone__c : "4556890",
          payday__Bank_Name__c : "Wells Fargo",
          payday__Job_Title__c : "Doctor",
          payday__Loan_Amount__c : 300.00,
          payday__Military_Status__c : "Not A Regular Member of Armed Forces",
          payday__Reference_1_Relation__c : "Coworker",
          payday__Income_Type__c : "Employed",
          payday__Supervisor_Name__c : "Test Name",
          payday__Employer_Name__c : "The Selling Source,Inc .",
          payday__Bank_Account_Number__c : "111111111",
          payday__Paycheck_Frequency__c : "Bi-Weekly",
          payday__Work_Zip_Code__c : "123456",
          payday__ID_State__c : "nv",
          payday__Reference_2_Relation__c : "Coworker",
          payday__Product_Type__c:"Installment",
          payday__Exclude_Documents__c:true,
          payday__ACH_Relationship_Type__c:"Primary",
          payday__Recurring_ACH__c:true,
          payday__Lead_Source__c:"test lead Source",
          Reference_1__r : {
            attributes : {
              type : "Contact"
            },
            FirstName : "TEST",
            LastName : "CONTACT",
            MobilePhone : "7025555755"
          },
          Reference_2__r : {
            attributes : {
              type : "Contact"
            },
            FirstName : "TEST",
            LastName : "CONTACT2",
            MobilePhone : "7025555756"
          },
          Contact__r : {
            attributes : {
              type : "Contact"
            },
            MailingState : "NV",
            MailingCity : "hometown",
            Email : "sample@test.com",
            MailingStreet : "123 birch street",
            MailingPostalCode : "89002",
            Birthdate : "1984-12-12",
            FirstName : "Wonder",
            payday__SSN__c : "123456789",
            MobilePhone : "7025555555",
            LastName : "Woman",
            HomePhone : "7025553314",
            payday__Middle_Name__c :""
          }
        }};

        org.apexRest({uri: 'services/apexrest/payday/insertLoanApplication', method: 'POST', body: JSON.stringify(loan) }, function(error, response){
          if(!error) console.log('It worked!');
          callback(error, response)
        });
      });
    }
  }