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
	const album = await new models.Album({ id: req.params.albumId }).fetch({ withRelated: 'photos'});  

	res.send({
		status: 'success',
		data: {
			album,
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
	store
};