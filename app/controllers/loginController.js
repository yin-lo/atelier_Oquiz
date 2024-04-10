const { User } = require('../models');

const pretty = (obj) => JSON.stringify(obj, null, 2);
const cpretty = (obj) => console.log(pretty(obj));

const loginController = {
	index(req, res) {
		res.render('login');
	}
}

module.exports = loginController;