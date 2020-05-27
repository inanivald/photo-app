const models = require('../models');
const { matchedData, validationResult } = require('express-validator');


const index = async (req, res) => {
	const all_albums = await models.Album.fetchAll();

	res.send({
		status: 'success',
		data: {
			albums: all_albums
		}
	});
}

const show = async (req, res) => {
	const album = await new models.Album({ id: req.params.albumId }).fetch({ withRelated: 'photos'});    // select * from books where id = 1

	res.send({
		status: 'success',
		data: {
			album,
		}
	});
}
//POST
const store = async (req, res) => {
	// Finds the validation errors in this request and wraps them in an object with handy functions
	const errors = validationResult(req);
	if (!errors.isEmpty()) {
		console.log("Create album request failed validation:", errors.array());
		res.status(422).send({
			status: 'fail',
			data: errors.array(),
		});
		return;
	}

	const validData = matchedData(req);

	try {
		const album = await new models.Album(validData).save();
		console.log("Created new album successfully:", album);

		res.send({
			status: 'success',
			data: {
				album,
			},
		});

	} catch (error) {
		res.status(500).send({
			status: 'error',
			message: 'Exception thrown in database when creating a new album.',
		});
		throw error;
	}
}

module.exports = {
    index,
	show,
	store
};