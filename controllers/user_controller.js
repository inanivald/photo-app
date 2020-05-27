const models = require('../models');


//GET
const index = async (req, res) => {
	const all_users = await models.User.fetchAll();

	res.send({
		status: 'success',
		data: {
			users: all_users
		}
	});
}

//GET /:userId

const show = async (req, res) => {
	const user = await new models.User({ id: req.params.userId })
		.fetch({ withRelated: ['albums', 'photos'] });

	res.send({
		status: 'success',
		data: {
			user,
		}
	});
}

module.exports = {
	index,
	show,
	// store,
	// update,
	// destroy,
}