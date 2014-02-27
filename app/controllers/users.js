module.exports.create = function(pgClient) {
  var usersModel = require('./app/models/users').create(pgClient);
  var self = {   
    loginPage: function(req, res) {
      res.render('login.html', {});
    },
    login: function(req, res) {
      res.send(501, {status: "error", message: "Not implemented"});
    }
  };
  return self;
}
