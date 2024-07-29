const { User } = require('../models');

/**
 * Ce middleware me permet de récupérer de manière centralisée l'utilisateur connecté
 * Partout où j'aurai besoin des informations de l'utilisateur, je pourrai les récupérer
 * dans le req.user ou res.locals.user pour mes vues ejs
 * @param {*} req
 * @param {*} res
 * @param {*} next
 */
async function loadUser(req, res, next) {
  try {
    if (req.session.userId) {
      // A partir de l'id de l'utilisateur stocker en session.
      // Je vais chercher l'utilisateur en base de données
      const user = await User.findByPk(req.session.userId);
      if (user) {
        // Et le stocker dans req.user et res.locals.user
        req.user = user;
        res.locals.user = user;
      }
    }

    next();
  } catch (err) {
    console.log(err);
    res.status(500).send('Erreur interne');
  }
}

module.exports = loadUser;
