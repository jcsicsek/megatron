var express = require('express');

module.exports.create = function(pgClient) {
  var usersModel = require('./models/users').create(pgClient);

  var self = {
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
    },

    setMerchantContext: function(req, res, next) {
      if (req.subdomains.length == 1) {
        usersModel.getPartner(req.subdomains[0], function(error, merchant) {
          res.locals.logoUrl = merchant.logo_url;
          next();
        });
      } else {
        res.locals.logoUrl = "/images/tabbio.png";
        next();
      }
    }
  }
  return self;
}
