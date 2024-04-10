const { Quiz } = require('../models');

// const pretty = (obj) => JSON.stringify(obj, null, 2);
// const cpretty = (obj) => console.log(pretty(obj));

const quizController = {
  async getList (req, res) {
	
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
		},{
			association: 'tags',
		},{
			association: 'author',
		},
	],
	});

	//si aucun questionOfQuiz en BDD, on passe par le middleware du stack :
	if (!questionsOfQuiz) {
		return next();
	}
	
	// cpretty(questionsOfQuiz);
	// TODO - mettre en forme la date ave DAY.JS

	// TODO - mettre la bonne réponse dans les inputs

	res.render('quiz', {quiz: questionsOfQuiz})
  },
};

module.exports = quizController;