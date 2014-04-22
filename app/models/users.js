var hat = require('hat');

module.exports.create = function(pgClient) {
  var self = {
    getByEmail: function(email, callback) {
      var query = "SELECT u.id, u.email, ur.role, u.active, u.password FROM users u JOIN user_roles ur ON u.id = ur.user_id WHERE u.email=$1";
      pgClient.query(query, [email], function(error, result) {
        callback(error, result.rows[0]);
      });
    },
    createPartner: function(email, passwordHash, role, contactName, businessName, phone, logoUrl, subdomain, callback) {
      var now = new Date();
      var apiKey = hat();
      var query = "INSERT INTO users (email, password, created, modified, last_login, active) VALUES ($1, $2, $3, $4, $5, $6) RETURNING id";
      pgClient.query(query, [email, passwordHash, now, now, now, true], function(error, result) {
        var query = "INSERT INTO user_roles (user_id, role, created, modified) VALUES ($1, $2, $3, $4)";
        var userId = result.rows[0].id;
        pgClient.query(query, [userId, role, now, now], function(error, results) {
          var query = "INSERT INTO partners (user_id, logo_url, contact_name, business_name, phone, subdomain, created, modified, active, api_key) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9)";
          pgClient.query(query, [userId, logoUrl, contactName, businessName, phone, subdomain, now, now, true, apiKey], function(error, result) {
            callback(error, {
              id: userId,
              email: email,
              role: role,
              active: true,
              api_key: apiKey
            });
          })
        })
      });
    },
    get: function(userId, callback) {
      var query = "SELECT u.id, u.email, ur.role, u.active, u.password FROM users u JOIN user_roles ur ON u.id = ur.user_id WHERE u.id=$1";
      pgClient.query(query, [userId], function(error, result) {
        callback(error, result.rows[0]);
      });
    },
    subdomainExists: function(subdomain, callback) {
      var query = "SELECT EXISTS(SELECT 1 FROM partners WHERE subdomain=$1)";
      pgClient.query(query, [subdomain], function(error, result) {
        callback(error, result.rows[0].exists);
      });
    },
    emailExists: function(email, callback) {
      var query = "SELECT EXISTS(SELECT 1 FROM users WHERE email=$1)";
      pgClient.query(query, [email], function(error, result) {
        callback(error, result.rows[0].exists);
      });
    },
    getApiKeyBySubdomain: function(subdomain, callback) {
      var query = "SELECT api_key FROM partners WHERE subdomain=$1";
      pgClient.query(query, [subdomain], function(error, results) {
        if (!results || results.rows.length == 0) {
          callback("partner not found", null);
        } else {
          callback(null, results[0].api_key);
        }
      })
    }
  };
  return self;
}
