const { User } = require('../models');

const pretty = (obj) => JSON.stringify(obj, null, 2);
const cpretty = (obj) => console.log(pretty(obj));

const signupController = {
	index(req, res) {
		res.render('signup');
	},

	async registration(req, res) {
		const newUser = await User.create({
			firstname: req.body.firstname,
			lastname: req.body.lastname,
			email: req.body.email,
			password: req.body.password,
		});
		
		cpretty(newUser);

		res.redirect('/');
	},
};

module.exports = signupController;
