const { User } = require('../models');

// const pretty = (obj) => JSON.stringify(obj, null, 2);
// const cpretty = (obj) => console.log(pretty(obj));

const signupController = {
	index(req, res) {
		// const signup = await User.
		// cpretty();
		res.render('signup');
	},

	registration(req, res) {
		res.render('signup');
	},
};

module.exports = signupController;
