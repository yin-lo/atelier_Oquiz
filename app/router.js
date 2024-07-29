const { Router } = require('express');

const router = Router();
const mainController = require('./controllers/mainController');
const levelController = require('./controllers/levelController');
const quizController = require('./controllers/quizController');
const tagController = require('./controllers/tagController');
const authController = require('./controllers/authController');
const isAuthed = require('./middlewares/isAuthed');
const isAdmin = require('./middlewares/isAdmin');

const { catchErrors } = require('./middlewares/error/error');

router.get('/', catchErrors(mainController.index));
router.get('/levels', isAdmin, catchErrors(levelController.list));
router.post('/levels', isAdmin, catchErrors(levelController.create));
router.get('/levels/update', isAdmin, catchErrors(levelController.formLevel));
router.post('/levels/update', isAdmin, catchErrors(levelController.update));
router.post('/levels/delete', isAdmin, catchErrors(levelController.delete));

router.get('/tags', catchErrors(tagController.list));

router.get('/signup', catchErrors(authController.signupPage));
router.post('/signup', catchErrors(authController.signupAction));

router.get('/login', catchErrors(authController.loginPage));
router.post('/login', catchErrors(authController.loginAction));
router.get('/logout', catchErrors(authController.logout));

router.get('/quiz/:id', isAuthed, catchErrors(quizController.getList));

module.exports = router;
