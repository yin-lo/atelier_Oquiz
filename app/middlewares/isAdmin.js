function isAdmin(req, res, next) {
  // Notre utilisateur si il est connecté se situe dans req.user
  if (req.user?.role !== 'admin') {
    // Si l'utilisateur n'est pas connecté, on le redirige vers la page de connexion
    res.redirect('/');
  } else {
    // Sinon si l'utilisateur est connecté, je le laisse passer
    next();
  }
}

module.exports = isAdmin;
