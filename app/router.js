const { Router } = require('express');

const mainController = require('./controllers/mainController');
const levelController = require('./controllers/levelController');
const quizController = require('./controllers/quizController');
const tagController = require('./controllers/tagController'); 
const signupController = require('./controllers/signupController');
const loginController = require('./controllers/loginController');

const { catchErrors } = require('./middlewares/error/error');

const router = Router();

// page d'accueil :
router.get('/', catchErrors(mainController.index));

// page de jeu d'un quiz :
router.get('/quiz/:id', catchErrors(quizController.getList));

// page de levels :
router.get('/levels', catchErrors(levelController.list));
router.post('/levels', catchErrors(levelController.create));

// page des thèmes :
router.get('/tags', catchErrors(tagController.list));

// page d'inscription :
router.get('/signup', catchErrors(signupController.index));
router.post('/signup', catchErrors(signupController.registration));

// page de connexion : 
router.get('/login', catchErrors(loginController.index));

module.exports = router;
