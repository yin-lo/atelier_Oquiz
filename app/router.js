const { Router } = require('express');

const mainController = require('./controllers/mainController');

const levelController = require('./controllers/levelController');

const quizController = require('./controllers/quizController');

const router = Router();

// page d'accueil :
router.get('/', mainController.index);

// page de jeu d'un quiz :
router.get('/quiz/:id', quizController.getList);

// page de levels :
router.get('/levels', levelController.list);
router.post('/levels', levelController.create);

module.exports = router;
