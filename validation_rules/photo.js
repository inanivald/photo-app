/**
 * Photo Validation Rules
 */

const { body } = require('express-validator');
const { User, Album } = require('../models');

const createPhotoRules = [
	body('title').isLength({ min: 3 }),
	body('url').isLength({ min: 3 }),
	body('album_id').isLength({ min: 1 }),
	// .custom(async value => {
	// 	const album = await new Album().fetch({ withRelated: 'user'});
	// 	const user = await new User().fetch();
	// 	console.log(value)
	// 	console.log(album.attributes.user_id)
	// 	console.log(user)
	// 	if (user.id == album.attributes.user) {
	// 		return Promise.resolve();
	// 	} return Promise.reject('You can not add photos to another users album.');
	// }),
	body('user_id').isLength({ min: 1 }).custom(async value => {
		const user = await new User().fetch();
		if (value == user.id) {
			return Promise.resolve();
		} return Promise.reject('You can not add photos to another user.');
	}),
];



module.exports = {
	createPhotoRules,
}
