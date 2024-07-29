const { Tag } = require('../models');

// const pretty = (obj) => JSON.stringify(obj, null, 2);
// const cpretty = (obj) => console.log(pretty(obj));

const tagController = {
	async list(req, res, next) {
		const tagList = await Tag.findAll({
			include: 'quizzes',
			order: [
				['name', 'ASC'],
				['quizzes', 'title', 'ASC']
			],
		});

		//si aucun tagList en BDD, on passe par le middleware du stack :
		if (!tagList) {
			return next();
		}

		// cpretty(tagList);
		res.render('tags', { tags: tagList });
	},
};

module.exports = tagController;
