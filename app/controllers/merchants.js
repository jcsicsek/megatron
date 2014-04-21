module.exports.create = function() {
  var self = {   
    overview: function(req, res) {
      res.render('manage/merchant/overview', { title: "Your Store Overview | tabb.io" });
    }
  };
  return self;
}
