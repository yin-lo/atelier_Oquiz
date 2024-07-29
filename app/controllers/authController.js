const { z } = require('zod');
const bcrypt = require('bcrypt');
const { User } = require('../models');

const authController = {
  // Signup = création de compte
  signupPage(req, res) {
    res.render('signup');
  },
  // L'action de création de compte (soumission du formulaire)
  async signupAction(req, res) {
    const schema = z.object({
      firstname: z.string().nullish(),
      lastname: z.string().nullish(),
      email: z.string().email(),
      password: z.string().min(8),
      confirmation: z.string().min(8),
    });

    // Je valide les données du formulaire
    const resultValidation = schema.safeParse(req.body);
    // Si les données ne sont pas correctes, je renvoie une erreur 400
    if (!resultValidation.success) {
      res.status(400).send(resultValidation.error);
      return;
    }

    // Si les mots de passe saison sont différents, je renvoie une erreur 400
    if (resultValidation.data.password !== resultValidation.data.confirmation) {
      res.status(400).send('Les mots de passe ne correspondent pas');
      return;
    }
    // On vérifie que l'email n'existe pas déjà en bdd
    const userWithSameEmail = await User.findOne({
      where: {
        email: resultValidation.data.email,
      },
    });

    if (userWithSameEmail) {
      // Si il existe déjà un utilisateur avec cet email, on l'envoie sur la page de connexion
      res.redirect('/login');
      return;
    }
    const passwordHash = await bcrypt.hash(resultValidation.data.password, 10);

    // Puis je crée l'utilisateur en base de données
    await User.create({
      firstname: resultValidation.data.firstname,
      lastname: resultValidation.data.lastname,
      email: resultValidation.data.email,
      password: passwordHash,
    });

    res.redirect('/login');
  },

  // Login = connexion
  loginPage(req, res) {
    res.render('login');
  },

  // L'action de connexion (soumission du formulaire)
  async loginAction(req, res) {
    // Est-ce que l'email existe en base de données ?
    const user = await User.findOne({
      where: {
        email: req.body.email,
      },
    });

    if (!user) {
      res.status(401).send('Mauvais identifiants');
      return;
    }

    // Est-ce que le mot de passe est correct ?
    const passwordIsValid = await bcrypt.compare(
      // Le mot de passe en clair
      req.body.password,
      // Le mot de passe hashé provenant de la base de données
      user.password,
    );

    if (!passwordIsValid) {
      res.status(401).send('Mauvais identifiants');
      return;
    }

    // Si tout est bon, on connecte l'utilisateur
    req.session.userId = user.id;
    res.redirect('/');
  },
  logout(req, res) {
    // Je supprime le cookie de session
    // résultat l'utilisateur est déconnecté
    req.session.destroy();
    res.redirect('/');
  },
};

module.exports = authController;
