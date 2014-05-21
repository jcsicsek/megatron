var platform = process.env.LOAN_SERVICING_PLATFORM ? process.env.LOAN_SERVICING_PLATFORM : "mock";
module.exports = require('./' + platform);
