var passwordHash = require('password-hash');

module.exports.create = function(pgClient) {
  var usersModel = require('../models/users').create(pgClient);
  var self = {   
    loginPage: function(req, res) {
      res.render('auth/login.html', {});
    },
    login: function(req, res) {
      res.send(501, {status: "error", message: "Not implemented"});
    },
    registerPage: function(req, res) {
      res.render('auth/register.html', {});
    },
    register: function(req, res) {
      if (req.body.password != req.body.password_conf) {
        res.send(400, {status: "error", message: "Password does not match password confirmation"});
      } else {
        usersModel.create(req.body.email, passwordHash.generate(req.body.password), req.body.role, function(error, results) {
          res.send({status: "success"});
        });     
      }
    }
  };
  return self;
}
