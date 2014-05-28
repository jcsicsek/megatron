var passwordHash = require('password-hash');
var urls = require('../config/routes').urls;
var loanPlatform = require('../lib/loan_servicing_platform');


module.exports.create = function(pgClient) {
  var usersModel = require('../models/users').create(pgClient);
  var self = {   
    viewstatementPage: function(req, res) {
      res.render('auth/viewstatement.html', {});
    },
    viewstatement: function(req, res) {
      res.redirect(urls.static.root);
    },
    logout: function(req, res) {
      req.logout();
      res.redirect(urls.static.root);
    },
    partnerloginPage: function(req, res) {
      res.render('auth/partnerlogin.html', {});
    },
    partnerlogin: function(req, res) {
      res.redirect(urls.merchants.overview);
    },
    partnerregisterPage: function(req, res) {
      res.render('auth/partnerregister.html', {});
    },

    partnerregister: function(req, res) {
      if (req.body.password != req.body.password_conf) {
        res.send(400, {status: "error", message: "Password does not match password confirmation"});
      } else {
        usersModel.emailExists(req.body.email, function(error, emailExists) {
          if (emailExists) {
            res.send(409, {status: "error", message: "A user with this email address already exists."});
          } else {
            usersModel.subdomainExists(req.body.url, function(error, subdomainExists) {
              if (subdomainExists) {
                res.send(409, {status: "error", message: "This subdomain is in use by another partner."})
              } else {
                loanPlatform.addMerchant(req.body.url, function(error, lpMerchantId) {
                  usersModel.createPartner(req.body.email, passwordHash.generate(req.body.password), "partner", req.body.name, req.body.company, req.body.phone, "", req.body.url, lpMerchantId, function(error, user) {
                    req.login(user, function(error) {
                      res.redirect(urls.merchants.overview);          
                    })
                  });
                })
              }
            })
          }
        })  
      }
    },
    whoami: function(req, res) {
      res.send(req.user);
    }
  };
  return self;
}
