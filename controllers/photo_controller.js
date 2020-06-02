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
	const errors = validationResult(req);
	if (!errors.isEmpty()) {
		console.log("Create photo request failed validation:", errors.array());
		res.status(422).send({
			status: 'fail',
			data: errors.array(),
		});
		return;
	}

	const validData = matchedData(req);

	try {
		const photo = await new models.Photo(validData).save();
		console.log("Created new photo successfully:", photo);

		res.send({
			status: 'success',
			data: {
				photo,
			},
		});

	} catch (error) {
		res.status(500).send({
			status: 'error',
			message: 'Exception thrown in database when creating a new photo.',
		});
		throw error;
	}
}

module.exports = {
	index,
	show,
	store,
	// destroy,
}