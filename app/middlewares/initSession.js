const expressSession = require('express-session');

const session = expressSession({
	resave: true,
	saveUninitialized: true,
	secret: process.env.SECRET,
	cookie: {
		secure: false,
	},
});

module.exports = session;