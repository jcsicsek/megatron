module.exports = {
	decideApproval: function(firstName, lastName, address, city, state, zipCode, phone, lastFour, amount, ipAddress, callback) {
		callback(null, true);
	}
}
