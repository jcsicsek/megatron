module.exports = {
  salesforce: {
    connection: {
      clientId: '3MVG9JZ_r.QzrS7hBs6l2_L90yg2aBGSO72D1a_uGF0aPCkMIv7.Ef6Xaoow6oQVIi9.uu5VS7i1ULjWkMZ8y',
      clientSecret: '4842824259730235377',
      redirectUri: 'http://localhost:3000/oauth/_callback',
      environment: 'production',  // optional, salesforce 'sandbox' or 'production', production default
      mode: 'single' // optional, 'single' or 'multi' user mode, multi default
    },
    credentials: {
      username: "jeff_trial@tabb.io",
      password: "Welcome1",
      securityToken: "l3o99Vq6Tdww3R9BCWV5mN3A3"
    }
  },
  twilio: {
    account_sid: "AC3666eafb680bb9c0584c0df44549195c",
    auth_token: "2a9e0ec1e36f341189750449b98d739b",
    phone: "6466812434"
  },
  mifos: {
    url: "https://ec2-54-76-20-104.eu-west-1.compute.amazonaws.com:8443/mifosng-provider/api/v1/",
    username: "mifos",
    password: "password",
    tenantIdentifier: "default",
    officeId: 1
  }
}
