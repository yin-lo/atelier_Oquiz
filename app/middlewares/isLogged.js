const isLogged = (req, res, next) => {
	if ((req.session.userId)) {
		next()
	} else {
		res.redirect('/login')
	}
}

module.exports = isLogged;