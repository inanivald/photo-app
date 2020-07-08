const { matchedData, validationResult } = require('express-validator');
const { Photo, Album } = require('../models');

//GET users albums
const index = async (req, res) => {
	try {
		const albums = await Album.where("user_id", req.user.data.id).fetchAll();

		res.status(200).send({
			status: "success",
			data: {
				albums,
			}
		});
	} catch {
		res.status(404).send({
			status: "fail",
			data: "Albums not found.",
		});
	}
};

//GET /:albumId
const show = async (req, res) => {
	let album = null;
	try {
		album = await Album.fetchById(req.params.albumId, { withRelated: "photos" });
	} catch {
		res.status(404).send({
			status: "fail",
			message: `Album with ID ${req.params.albumId} was not found.`,
		});
		return;
	}

	const userId = album.get("user_id");
	if (userId !== req.user.data.id) {
		res.status(401).send({
			status: "fail",
			message: `You are not authorized to see album with ID ${req.params.albumId}.`,
		});
		return;
	}

	try {
		const photos = album.related("photos");

		res.status(200).send({
			status: "success",
			data: {
				album: {
					id: album.get('id'),
					title: album.get('title'),
					photos,
				},
			}
		});
		return;
	} catch (error) {
		res.status(500).send({
			status: "error",
			message: "Sorry, database threw an error when trying to find the album.",
		});
		throw error;
	}
};

//POST new album
const storeAlbum = async (req, res) => {
	// Find any validation errors and wrap them in an object
	const errors = validationResult(req);
	if (!errors.isEmpty()) {
		res.status(422).send({
			status: "fail",
			data: errors.array(),
		});
		return;
	}

	const validData = matchedData(req);

	const album = {
		title: validData.title,
		user_id: req.user.data.id
	}

	try {
		await new Album(album).save();

		res.status(201).send({
			status: 'success',
			data: album,
		});

	} catch (error) {
		res.status(500).send({
			status: 'error',
			message: 'Exception thrown in database when trying to create a new album.',
		});
		throw error;
	}
}

const addPhotos = async (req, res) => {

	let album = null;
	try {
		album = await Album.fetchById(req.params.albumId);
	} catch {
		res.status(404).send({
			status: "fail",
			message: `Album with ID ${req.params.albumId} was not found.`,
		});
		return;
	}

	const userId = album.get("user_id");
	if (userId !== req.user.data.id) {
		res.status(401).send({
			status: "fail",
			message: `You are not authorized to add photos to album with ID ${req.params.albumId}.`,
		});
		return;
	}
	const errors = validationResult(req);
	if (!errors.isEmpty()) {
		console.log("Add photo to album request failed validation:", errors.array());
		res.status(422).send({
			status: 'fail',
			data: errors.array(),
		});
		return;
	}

	try {
		const album = await Album.fetchById(req.params.albumId);
		const photo = await Photo.fetchById(req.body.photo_id);
		const result = await album.photos().attach(photo);

		res.status(201).send({
			status: 'success',
			data: result,
		});

	} catch (error) {
		res.status(500).send({
			status: 'error',
			message: 'Exception thrown when trying to add album to profile.',
		});
		throw error;
	}
}

//Remove photo from album
const removePhoto = async (req, res) => {
	let album = null;
	try {
		album = await Album.fetchById(req.params.albumId, { withRelated: "photos" });
	} catch {
		res.status(404).send({
			status: "fail",
			message: `Album with ID ${req.params.albumId} was not found.`,
		});
		return;
	}

	const userId = album.get("user_id");
	if (userId !== req.user.data.id) {
		res.status(401).send({
			status: "fail",
			message: `You are not authorized to make changes to album with ID ${req.params.albumId}.`,
		});
		return;
	}

	try {
		album.photos().detach(req.params.photoId);
		album.destroy();

		res.status(200).send({
			status: "success",
			data: null,
		});
		return;
	} catch (error) {
		res.status(500).send({
			status: "error",
			message: `Sorry, database threw an error when trying to remove photo with ID ${req.params.photoId}.`,
		});
		throw error;
	}
};

//Delete album
const destroy = async (req, res) => {
	let album = null;
	try {
		album = await Album.fetchById(req.params.albumId, { withRelated: "photos" });
	} catch {
		res.status(404).send({
			status: "fail",
			message: `Album with ID ${req.params.albumId} was not found.`,
		});
		return;
	}

	const userId = album.get("user_id");
	if (userId !== req.user.data.id) {
		res.status(401).send({
			status: "fail",
			message: `You are not authorized to delete album with ID ${req.params.albumId}.`,
		});
		return;
	}

	try {
		album.photos().detach();
		album.destroy();

		res.status(200).send({
			status: 'success',
			data: null,
		});
		return;
	} catch (error) {
		res.status(500).send({
			status: "error",
			message: `Sorry, database threw an error when trying to delete album with ID ${albumId}.`,
		});
		throw error;
	}
};


module.exports = {
    index,
	show,
	storeAlbum,
	addPhotos,
	removePhoto,
	destroy,
};