const models = require('../models');
const { matchedData, validationResult } = require('express-validator');

//GET
const index = async (req, res) => {
	const all_photos = await models.Photo.fetchAll();

	res.send({
		status: 'success',
		data: {
			photos: all_photos
		}
	});
}

//GET /:photoId
const show = async (req, res) => {
	const photo = await models.Photo.fetchById(req.params.photoId, { withRelated: ['album'] });

	res.send({
		status: 'success',
		data: {
			photo,
		}
	});
}

//POST
const store = async (req, res) => {
	res.status(405).send({
		status: 'fail',
		message: 'Method Not Allowed.',
	});
}

module.exports = {
	index,
	show,
	store,
	// destroy,
}