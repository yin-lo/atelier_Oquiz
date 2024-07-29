const { Level } = require('../models');

const levelController = {
  async list(req, res) {
    const levels = await Level.findAll();
    // Pour vérifier le contenu, on peut utiliser le JSON.stringify
    if (!levels) {
      return next();
    }
    res.render('levels', {
      levels,
    });
  },

  async create(req, res) {
    // J'utilise les données dans le body de la requête pour créer mon level
    await Level.create({
      name: req.body.name,
    });
    res.redirect('/levels');
  },
  async formLevel(req, res) {
    const nameLevel = req.query.name;

    res.render('level', { nameLevel });
  },

  async update(req, res) {
    const newNameLevel = req.body.name;
    const oldName = req.query.old_name;

    const dataLevel = await Level.update(
      { name: newNameLevel },
      {
        where: {
          name: oldName,
        },
        returning: true,
      }
    );
    res.redirect('/levels');
  },
  async delete(req, res) {
    const levelDelete = req.query.name;
    const deleteLevel = await Level.destroy({
      where: {
        name: levelDelete,
      },
    });
    res.redirect('/levels');
  },
};

module.exports = levelController;
