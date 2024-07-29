const bcrypt = require ('bcrypt');
const validator = require('validator');

const { User } = require('../models');

// const pretty = (obj) => JSON.stringify(obj, null, 2);
// const cpretty = (obj) => console.log(pretty(obj));

const signupController = {
	index(req, res) {
		res.render('signup');
	},

	async registration(req, res) {
		// destructuration de l'objet req.body :
		const { firstname, lastname, email, password, confirmation } = req.body;

		// avoir tous les champs :
		if (!firstname || !lastname || !email || !password || !confirmation) {
			throw new Error(`Les champs sont tous obligatoires`);
		}

		// vérifier que l'email est bien valide :
		if (!validator.isEmail(email)) {
			throw new Error(`L'email doit être correct`);
		}

		// vérifier si l'email est bien unique dans la BDD:
		// (on peut aussi ajouter la contrainte UNIQUE dans le BDD)
		// (on peut aussi l'écrire dans le model)
		const userFound = await User.findOne({
			where: {
				email: email
			}
		}) 

		if(userFound) {
			throw new Error(`L'email existe déjà en BDD`)
		}

		//avant de stocker, il faut hacher le mdp :
		const hash = await bcrypt.hash(password, process.env.SALT_ROUND || 10);

		// vérifier si mdp = confirmation :
		if (password !== confirmation) {
			throw new Error(`Les deux password ne sont pas identiques`)
		}

		// voir si le mdp est fort :
		const options = { minLength: 12, minLowercase: 1, minUppercase: 1, minNumbers: 1, minSymbols: 1 }

		if (!validator.isStrongPassword(password, options)) {
			throw new Error(`Le mdp doit comporter au moins 12 caractères comprenant une majuscule, un symbole et un chiffre.`)
		} else {
			// on veut se souvenir de ces informations et les stocker en BDD: 
			await User.create({
				firstname: firstname,
				lastname: lastname,
				email: email,
				password: hash,
			})
		}

		// on ajoute la variable fraichement créée :
		req.session.userId = new User.id;

		res.redirect('/');
	
	},
};

module.exports = signupController;
