const { Quiz } = require('../models');

const pretty = (obj) => JSON.stringify(obj, null, 2);
const cpretty = (obj) => console.log(pretty(obj));

const mainController = {
	async index(req, res) {
		const quizz = await Quiz.findAll({
			include: [
				{
					association: 'tags',
				},
				{
					association: 'author',
				},
			],
		});
    cpretty(quizz);

		res.render('home', { quizz });
	},
};

module.exports = mainController;
