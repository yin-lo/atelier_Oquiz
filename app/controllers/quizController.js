const { Quiz } = require('../models');

// dayjs :
const dayjs = require('dayjs');
require('dayjs/locale/fr');
dayjs().format();
dayjs.locale('fr');

// const pretty = (obj) => JSON.stringify(obj, null, 2);
// const cpretty = (obj) => console.log(pretty(obj));

const quizController = {
	async getList(req, res, next) {
		const quizId = Number(req.params.id);

		const questionsOfQuiz = await Quiz.findByPk(quizId, {
			include: [
				{
					association: 'questions',
					include: [
						{
							association: 'level',
						},
						{
							association: 'answers',
						},
					],
				},
				{
					association: 'tags',
				},
				{
					association: 'author',
				},
			],
		});

		const quizDate = dayjs(questionsOfQuiz.createdAt).format('dddd DD MMMM YYYY');
		//si aucun questionOfQuiz en BDD, on passe par le middleware du stack :
		if (!questionsOfQuiz) {
			return next();
		}

		// cpretty(questionsOfQuiz);

		// TODO - mettre la bonne réponse dans les inputs

		res.render('quiz', { quiz: questionsOfQuiz, date: quizDate });
	},
};

module.exports = quizController;
