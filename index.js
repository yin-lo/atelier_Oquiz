require('dotenv/config');
const express = require('express');
const { join } = require('path');
const router = require('./app/router');

const initSession = require('./app/middlewares/initSession');

const { notFound, errorHandler } = require('./app/middlewares/error/error');

const app = express();


app.set('view engine', 'ejs');
app.set('views', './app/views');

app.use(express.static(join(__dirname, 'public')));

app.use(initSession);

// Pour lire les données des formulaires, il faut ajouter ce middleware
app.use(express.urlencoded({ extended: true }));

app.use(router);

//permet de vérifier les erreurs (notFound en 1er pour gestion 404 puis errorHandler pour le render):
app.use(notFound);
app.use(errorHandler);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
	console.log(`Server is running on http://localhost:${PORT}`);
});
