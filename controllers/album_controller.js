const models = require('../models');


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

module.exports = {
    index,
    show
};