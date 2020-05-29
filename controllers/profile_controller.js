/**
 * Profile Controller
 */

const { matchedData, validationResult } = require('express-validator');
const { Photo, User, Album } = require('../models');

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
	user = await User.fetchById(req.user.data.id, { withRelated: 'photos' });
	const photos = await Photo.where("user_id", user.id).fetchAll();

	res.send({
		status: 'success',
		data: {
			photos,
		},
	});
}

//GET /photo
const getPhoto = async (req, res) => {
	
	try {
		const photo = await new Photo({
			id: req.params.photoId,
			user_id: req.user.data.id,
		}).fetch();


		res.send({
			status: 'success',
			data: {
				photo,
			},
		});

	} catch (error) {
		res.status(401).send({
			status: 'fail',
			data: 'You are not authorized to see this photo.',
		});
		throw error;
	}
}

//POST /photos
const addPhoto = async (req, res) => {

	const errors = validationResult(req);
	if (!errors.isEmpty()) {
		console.log("Add photo to profile request failed validation:", errors.array());
		res.status(422).send({
			status: 'fail',
			data: errors.array(),
		});
		return;
	}
	const validData = matchedData(req);
	try {
		const photo = await new Photo(validData).save();
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
			message: 'Exception thrown when trying to add photo to profile.',
		});
		throw error;
	}
}

//GET /albums
const getAlbums = async (req, res) => {
	
	let user = null;
	try {
		user = await User.fetchById(req.user.data.id, { withRelated: 'albums' });
	} catch (err) {
		console.error(err);
		res.sendStatus(404);
		return;
	}

	// get this user's albums
	user = await User.fetchById(req.user.data.id, { withRelated: 'albums' });
	const albums = await Album.where("user_id", user.id).fetchAll();

	res.send({
		status: 'success',
		data: {
			albums,
		},
	});
}


//GET /album
const getAlbum = async (req, res) => {
	
	try {
		const album = await new Album({
			id: req.params.albumId,
			user_id: req.user.data.id,
		}).fetch({ withRelated: 'photos' });


		res.send({
			status: 'success',
			data: {
				album,
			},
		});

	} catch (error) {
		res.status(401).send({
			status: 'fail',
			data: 'You are not authorized to see this album.',
		});
		throw error;
	}
}

//POST /album
const addAlbum = async (req, res) => {
	
	const errors = validationResult(req);
	if (!errors.isEmpty()) {
		res.status(422).send({
			status: 'fail',
			data: errors.array(),
		});
		return;
	}
	const validData = matchedData(req);

	try {
		const album = await new Album(validData).save();
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
			message: 'You can not add this album to profile.',
		});
		throw error;
	}
}

//DELETE album
const deleteAlbum = async (req, res) => {
	
	try {
		user = await User.fetchById(req.user.data.id, { withRelated: 'albums' });
	} catch (err) {
		console.error(err);
		res.sendStatus(404);
		return;
	}

	try {
		
		const album = await new Album({
			id: req.params.albumId,
			user_id: req.user.data.id}).destroy().then().photos.detached()

		res.send({
			status: 'success',
			data: {
				album,
			},
		});

	} catch (error) {
		res.status(401).send({
			status: 'fail',
			data: 'You are not authorized to delete this album.',
		});
		throw error;
	}
}

module.exports = {
	getProfile,
	getPhotos,
	getPhoto,
	addPhoto,
	getAlbums,
	getAlbum,
	addAlbum,
	deleteAlbum,
}
