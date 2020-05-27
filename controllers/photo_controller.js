const models = require('../models');

//GET
const index = async (req, res) => {
	const all_photos = await models.Photo.fetchAll();

	res.send({
		status: 'success',
		data: {
			books: all_photos
		}
	});
}

//GET /:bookId
const show = async (req, res) => {
	const photo = await models.Photo.fetchById(req.params.photoId, { withRelated: ['album'] });

	res.send({
		status: 'success',
		data: {
			photo,
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