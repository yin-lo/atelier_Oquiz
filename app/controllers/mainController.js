const { Quiz } = require('../models');

// const pretty = (obj) => JSON.stringify(obj, null, 2);
// const cpretty = (obj) => console.log(pretty(obj));

const mainController = {
	async index(req, res, next) {
		const quizz = await Quiz.findAll({
			include: [
				{
					association: 'tags',
				},
				{
					association: 'author',
				},
			],
			order: [['title', 'ASC']],
		});

		//si aucun quizz en BDD, on passe par le middleware du stack :
		if (!quizz) {
			return next();
		}
		// cpretty(quizz);

		res.render('home', { quizz });
	},
};

module.exports = mainController;
