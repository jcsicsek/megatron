var _ = require('underscore');
var dateFormat = require('dateformat');

var dailyData = function(loans, daysBack) {
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

module.exports = {
	dailyData: dailyData,
  todaySummary: function(loans) {
    var todaysData = dailyData(loans, 1)[0];
    return {
      loanCount: todaysData.loans.length,
      totalValue: _.reduce(todaysData.loans, function(memo, loan) {return loan.loanAmount + memo}, 0)
    }
  },
  loansPerDay: function(loans, daysBack) {
    return _.map(dailyData(loans, daysBack), function(day) {return {day: dateFormat(day.date, "yyyy-mm-dd"), v: day.loans.length}});
  },
  loansValuePerDay: function(loans, daysBack) {
    return _.map(dailyData(loans, daysBack), function(day) {return {
      day: dateFormat(day.date, "yyyy-mm-dd"),
      v: _.reduce(day.loans, function(memo, loan) {return loan.loanAmount + memo}, 0)
    }});
  }
}
