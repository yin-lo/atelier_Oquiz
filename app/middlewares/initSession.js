const expressSession = require('express-session');

const session = expressSession({
	resave: true,
	saveUninitialized: true,
	secret: process.env.SECRET,
	cookie: {
		secure: false,
		maxAge: (1000 * 60 * 60), // équivalent à 1h
		httpOnly: true,
	},
});

module.exports = session;