/**
 * Album Validation Rules
 */

const { body } = require('express-validator');

const createAlbumRules = [
	body('title').isLength({ min: 3 }),
];

const addPhotosRules = [
	body('photo_id').isLength({ min: 1 }),
];

module.exports = {
	createAlbumRules,
	addPhotosRules,
}
