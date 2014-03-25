module.exports.create = function() {
  var self = {   
    apply: function(req, res) {
      res.send({status: "success"});
    }
  };
  return self;
}
