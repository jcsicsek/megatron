module.exports.create = function(pgClient) {
  var self = {
      getByEmail: function(email, callback) {
        var query = "SELECT * FROM users WHERE email=?";
        pgClient.query(query, [email], function(error, result) {
          callback(error, result.rows[0]);
        });
      },
      create: function(email, passwordHash, role, callback) {
        var now = new Date();
        var query = "INSERT INTO users (email, password, created, modified, last_login, active) VALUES ($1, $2, $3, $4, $5, $6) RETURNING id";
        pgClient.query(query, [email, passwordHash, now, now, now, true], function(error, result) {
          var query = "INSERT INTO user_roles (user_id, role, created, modified) VALUES ($1, $2, $3, $4)";
          pgClient.query(query, [result.rows[0].id, role, now, now], function(error, results) {
            callback(error, result);           
          })
        });
      },
      get: function(userId, callback) {
        var query = "SELECT * FROM users WHERE id=?";
        pgClient.query(query, [userId], function(error, result) {
          callback(error, result.rows[0]);
        });
      }
    };
  return self;
}
