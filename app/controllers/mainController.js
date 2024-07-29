const { Quiz } = require('../models');

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

    if (!quizz) {
      // S'il n'y a aucun quiz existant en BDD, on execute le prochain middleware du stack: le 404
      return next();
    }
    res.render('home', { quizz });
  },
};

module.exports = mainController;
