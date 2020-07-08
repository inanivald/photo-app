const { Photo } = require('../models');
const { matchedData, validationResult } = require('express-validator');

//GET users photos
const index = async (req, res) => {
	try {
		const photos = await Photo.where("user_id", req.user.data.id).fetchAll();

		res.status(200).send({
			status: "success",
			data: {
				photos,
			}
		});
	} catch {
		res.status(404).send({
			status: "fail",
			data: "Photos not found.",
		});
	}
};

//GET /:photoId
const show = async (req, res) => {
	let photo = null;
	try {
		photo = await Photo.fetchById(req.params.photoId, { withRelated: "albums" });
	} catch {
		res.status(404).send({
			status: "fail",
			message: `Photo with ID ${req.params.photoId} was not found.`,
		});
		return;
	}

	const userId = photo.get("user_id");
	if (userId !== req.user.data.id) {
		res.status(401).send({
			status: "fail",
			message: `You are not authorized to see photo with ID ${req.params.photoId}.`,
		});
		return;
	}

	try {
		const albums = photo.related("albums");

		res.status(200).send({
			status: "success",
			data: {
				photo: {
					id: photo.get('id'),
					title: photo.get('title'),
					url: photo.get('url'),
					comment: photo.get('comment'),
					albums,
				},
			}
		});
		return;
	} catch (error) {
		res.status(500).send({
			status: "error",
			message: "Sorry, database threw an error when trying to get this photo.",
		});
		throw error;
	}

}

//POST new photo
const store = async (req, res) => {

	const errors = validationResult(req);
	if (!errors.isEmpty()) {
		res.status(422).send({
			status: "fail",
			data: errors.array(),
		});
		return;
	}

	const validData = matchedData(req);

	const photo = {
		title: validData.title,
		url: validData.url,
		comment: validData.comment,
		user_id: req.user.data.id
	}

	try {
		await new Photo(photo).save();

		res.status(201).send({
			status: "success",
			data: photo,
		});

	} catch (error) {
		res.status(500).send({
			status: "error",
			message: 'Exception thrown in database when trying to create a new photo.',
		});
		throw error;
	}
};

//Delete photo
const destroy = async (req, res) => {
	let photo = null;
	try {
		photo = await Photo.fetchById(req.params.photoId, { withRelated: "albums" });
	} catch {
		res.status(404).send({
			status: "fail",
			message: "Photo not found.",
		});
		return;
	}

	const userId = photo.get("user_id");
	if (userId !== req.user.data.id) {
		res.status(401).send({
			status: "fail",
			message: `You are not authorized to delete photo with ID ${req.params.photoId}.`,
		});
		return;
	}

	try {
		photo.albums().detach();
		photo.destroy();

		res.status(200).send({
			status: "success",
			data: null,
		});
		return;
	} catch (error) {
		res.status(500).send({
			status: "error",
			message: `Sorry, database threw an error when trying to delete photo with ID ${req.params.photoId}.`,
		});
		throw error;
	}
};

module.exports = {
	index,
	show,
	store,
	destroy,
}