var hat = require('hat');

module.exports.create = function(pgClient) {
  var self = {
    getByEmail: function(email, callback) {
      var query = "SELECT u.id, u.email, ur.role, u.active, u.password FROM users u JOIN user_roles ur ON u.id = ur.user_id WHERE u.email=$1";
      pgClient.query(query, [email], function(error, result) {
        callback(error, result.rows[0]);
      });
    },
    get: function(userId, callback) {
      var query = "SELECT u.id, u.email, ur.role, u.active, u.password FROM users u JOIN user_roles ur ON u.id = ur.user_id WHERE u.id=$1";
      pgClient.query(query, [userId], function(error, result) {
        callback(error, result.rows[0]);
      });
    },
    emailExists: function(email, callback) {
      var query = "SELECT EXISTS(SELECT 1 FROM users WHERE email=$1)";
      pgClient.query(query, [email], function(error, result) {
        callback(error, result.rows[0].exists);
      });
    }
  };
  return self;
}
