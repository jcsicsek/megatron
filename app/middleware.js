var express = require('express');
var usersModel = require('./models/users');

module.exports = {
  authenticateMerchant: function(req, res, next) {
    basicAuth(function(username, password, callback) {
      getApiKeyBySubdomain(req.subdomains[0], function(error, apiKey) {
        if (!apiKey || apiKey != username) {
          callback(null, false);
        } else {
          callback(null, true);
        }
      })
    })(req, res, next);
  }
}