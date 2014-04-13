var deepmerge = require('deepmerge');

var common = require('./common');
var env = null
try {
	env = require('./' + process.env.NODE_ENV);
} catch (error) {

} finally {
  module.exports = env ? deepmerge(common, env) : common;
}
