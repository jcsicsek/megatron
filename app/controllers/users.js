var passwordHash = require('password-hash');

module.exports.create = function(pgClient) {
  var usersModel = require('../models/users').create(pgClient);
  var self = {   
    loginPage: function(req, res) {
      res.render('auth/login.html', {});
    },
    login: function(req, res) {
      res.redirect('/');
    },
    registerPage: function(req, res) {
      res.render('auth/register.html', {});
    },
    register: function(req, res) {
      if (req.body.password != req.body.password_conf) {
        res.send(400, {status: "error", message: "Password does not match password confirmation"});
      } else {
        usersModel.create(req.body.email, passwordHash.generate(req.body.password), req.body.role, function(error, user) {
          req.login(user, function(error) {
            res.send({status: "success"});          
          })
        });     
      }
    },
    whoami: function(req, res) {
      res.send(req.user);
    }
  };
  return self;
}
