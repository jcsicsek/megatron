var express = require('express');

module.exports.create = function(pgClient) {
  var partnersModel = require('./models/partners').create(pgClient);

  var self = {
    authenticateMerchant: function(req, res, next) {
      basicAuth(function(username, password, callback) {
        partnersModel.getApiKeyBySubdomain(req.subdomains[0], function(error, apiKey) {
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
        partnersModel.getPartner(req.subdomains[0], function(error, merchant) {
          res.locals.logoUrl = merchant.logo_url;
          res.locals.colorTheme = merchant.color_theme;
          res.locals.businessName = merchant.business_name;
          next();
        });
      } else {
        res.locals.logoUrl = "/images/tabbio-small.png";
        next();
      }
    }
  }
  return self;
}
