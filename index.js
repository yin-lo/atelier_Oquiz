require('dotenv/config');
const express = require('express');
const { join } = require('path');
const router = require('./app/router');
const initSession = require('./app/middlewares/initSession');
const loadUser = require('./app/middlewares/loadUser');
const { errorHandler, notFound } = require('./app/middlewares/error/error');

const app = express();

app.set('view engine', 'ejs');
app.set('views', './app/views');

app.use(express.static(join(__dirname, 'public')));

// Pour lire les données des formulaires, il faut ajouter ce middleware
app.use(express.urlencoded({ extended: true }));

app.use(initSession);

app.use(loadUser);

app.use(router);

// gestion des 404 :
app.use(notFound);
// le render (middleware) des erreurs transmisent:
app.use(errorHandler);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
