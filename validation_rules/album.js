/**
 * Album Validation Rules
 */

const { body } = require('express-validator');
const { User } = require('../models');

const createAlbumRules = [
	body('title').isLength({ min: 3 }),
	body('user_id').isLength({ min: 1 }).custom(async value => {
		const user = await new User().fetch();
		if (value == user.id) {
			return Promise.resolve();
		} return Promise.reject('You can not add albums to another user.');
	}),
];



module.exports = {
	createAlbumRules,
}
