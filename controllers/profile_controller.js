/**
 * Profile Controller
 */

const { matchedData, validationResult } = require('express-validator');
const { Photo, User } = require('../models');

 //GET
const getProfile = async (req, res) => {

	let user = null;
	try {
		user = await User.fetchById(req.user.data.id);
	} catch (err) {
		res.sendStatus(404);
		throw err;
	}

	res.send({
		status: 'success',
		data: {
			user: {
				email: user.get('email'),
				first_name: user.get('first_name'),
				last_name: user.get('last_name'),
			},
		}
	});
}

//GET /photos

const getPhotos = async (req, res) => {
	
	let user = null;
	try {
		user = await User.fetchById(req.user.data.id, { withRelated: 'photos' });
	} catch (err) {
		console.error(err);
		res.sendStatus(404);
		return;
	}

	// get this user's photos
	const photos = user.related('photos');

	res.send({
		status: 'success',
		data: {
			photos,
		},
	});
}

//POST /photos

const addPhotos = async (req, res) => {

	const errors = validationResult(req);
	if (!errors.isEmpty()) {
		console.log("Add photo to profile request failed validation:", errors.array());
		res.status(422).send({
			status: 'fail',
			data: errors.array(),
		});
		return;
	}

	try {
		const photo = await Photo.fetchById(req.body.data.photo.id);

		const user = await User.fetchById(req.user.data.id);

		const result = await user.photos().attach(photo);

		res.status(201).send({
			status: 'success',
			data: result,
		});

	} catch (error) {
		res.status(500).send({
			status: 'error',
			message: 'Exception thrown when trying to add photo to profile.',
		});
		throw error;
	}
}

module.exports = {
	getProfile,
	getPhotos,
	addPhotos,
}
