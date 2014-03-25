module.exports.create = function() {
  var self = {   
    apply: function(req, res) {
      res.send({status: "success"});
    },
    applyPage: function(req, res) {
      res.render('loans/apply.html', {});
    }
  };
  return self;
}
