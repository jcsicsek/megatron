var passwordHash = require('password-hash');

module.exports.create = function(pgClient) {
  var usersModel = require('../models/users').create(pgClient);
  var self = {   
    consumerloginPage: function(req, res) {
      res.render('auth/consumerlogin.html', {});
    },
    consumerlogin: function(req, res) {
      res.redirect('/');
    },
    logout: function(req, res) {
      req.logout();
      res.redirect('/');
    },
    partnerloginPage: function(req, res) {
      res.render('auth/partnerlogin.html', {});
    },
    partnerlogin: function(req, res) {
      res.redirect('/');
    },
    partnerregisterPage: function(req, res) {
      res.render('auth/register.html', {});
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
                usersModel.createPartner(req.body.email, passwordHash.generate(req.body.password), "partner", req.body.name, req.body.company, req.body.phone, "", req.body.url, function(error, user) {
                  req.login(user, function(error) {
                    res.redirect('/');          
                  })
                });
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
