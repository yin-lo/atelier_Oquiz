const bcrypt = require('bcrypt');
const validator = require('validator');

const { User } = require('../models');

const pretty = (obj) => JSON.stringify(obj, null, 2);
const cpretty = (obj) => console.log(pretty(obj));

const loginController = {
	index(req, res) {
		res.render('login');
	},

	async login(req, res) {
		// desctructuration de req.body :
		const { email, password } = req.body;

		// avoir tous les champs :
		if (!email || !password) {
			throw new Error(`Les champs sont obligatoires`);
		}

		const userFound = await User.findOne({
			where: {
				email: email,
			},
		});

		if (!userFound) {
			throw new Error(`La combinaison est invalide`);
		}

		const passwordMatched = await bcrypt.compare(password, userFound.password);

		if (!passwordMatched) {
			throw new Error(`La combinaison est invalide`);
		}

		req.session.userIc = userFound.id;

		res.redirect('/');
	},
};

module.exports = loginController;
