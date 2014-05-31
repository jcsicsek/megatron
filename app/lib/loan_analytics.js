var _ = require('underscore');

module.exports = {
	dailyData: function(loans, daysBack) {
    var rv = [];
    var date = new Date();
    date.setHours(0, 0, 0, 0);
    date.setDate(date.getDate() + 1)

    for (i = 0; i < daysBack; i++) {
      date.setDate(date.getDate() - 1);

      var loansInBucket = _.filter(loans, function(loan) {
        return (loan.createdDate.getDate() == date.getDate())
      })
      rv.push({
        date: new Date(date),
        loans: loansInBucket
      })
    }

    return rv;
  }
}
