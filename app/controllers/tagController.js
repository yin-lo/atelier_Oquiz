const { Tag } = require('../models');

const pretty = (obj) => JSON.stringify(obj, null, 2);
const cpretty = (obj) => console.log(pretty(obj));

const tagController = {
  async list(req, res) {
    const tagList = await Tag.findAll({
      include: [
        {
          association: 'quizzes',
        },
      ],
      order: [
        ['name', 'ASC'],
        ['quizzes', 'title', 'ASC'],
      ],
    });

    if (!tagList) {
      return next();
    }
    res.render('tags', { tags: tagList });
  },
};

module.exports = tagController;
