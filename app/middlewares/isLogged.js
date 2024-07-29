const isLogged = (req, res, next) => {
	// S'il est connecté, on next
	if ((req.session.userId)) {
		next()
	} else {
		// s'il n'est pas connecté, on le redirige vers la page de connexion
		res.redirect('/login')
	}
}

module.exports = isLogged;