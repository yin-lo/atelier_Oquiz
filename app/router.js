const { Router } = require('express');

const mainController = require('./controllers/mainController');
const levelController = require('./controllers/levelController');
const quizController = require('./controllers/quizController');
const tagController = require('./controllers/tagController'); 
const signupController = require('./controllers/signupController');
const loginController = require('./controllers/loginController');

const router = Router();

// page d'accueil :
router.get('/', mainController.index);

// page de jeu d'un quiz :
router.get('/quiz/:id', quizController.getList);

// page de levels :
router.get('/levels', levelController.list);
router.post('/levels', levelController.create);

// page des thèmes :
router.get('/tags', tagController.list);

// page d'inscription :
router.get('/signup', signupController.index);
router.post('signup', signupController.registration);

// page de connexion : 
router.get('/login', loginController.index);

module.exports = router;
