/**
 * Photo Validation Rules
 */

const { body } = require('express-validator');

const createPhotoRules = [
	body('title').isLength({ min: 3 }),
	body('url').isLength({ min: 3 }),
	body('album_id').isLength({ min: 1 }),
	body('user_id').isLength({ min: 1 }),
];



module.exports = {
	createPhotoRules,
}
