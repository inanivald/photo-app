/**
 * Album Validation Rules
 */

const { body } = require('express-validator');

const createAlbumRules = [
	body('title').isLength({ min: 3 }),
];



module.exports = {
	createAlbumRules,
}
