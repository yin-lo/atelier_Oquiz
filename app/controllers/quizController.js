const dayjs = require('dayjs');
require('dayjs/locale/fr');
const { Quiz } = require('../models');
// import dayjs from 'dayjs' // ES 2015
dayjs().format();
dayjs.locale('fr');

const pretty = (obj) => JSON.stringify(obj, null, 2);
const cpretty = (obj) => console.log(pretty(obj));

const quizController = {
  async getList(req, res) {
    const quizId = Number(req.params.id);

    const questionsOfQuiz = await Quiz.findByPk(quizId, {
      include: [
        {
          association: 'questions',
          include: [
            {
              association: 'level',
            },
            { association: 'answers' },
          ],
        },
        { association: 'tags' },
        { association: 'author' },
      ],
    });
    const quizDate = dayjs(questionsOfQuiz.createdAt).format(
      'dddd DD MMMM YYYY',
    );
    if (!questionsOfQuiz) {
      return next();
    }

    res.render('quiz', { quiz: questionsOfQuiz, date: quizDate });
  },
};

module.exports = quizController;
