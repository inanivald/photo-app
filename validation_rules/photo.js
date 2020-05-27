/**
 * Photo Validation Rules
 */

const { body } = require('express-validator');

const createPhotoRules = [
	body('title').isLength({ min: 3 }),
	body('url').isLength({ min: 3 }),
];



module.exports = {
	createPhotoRules,
}
