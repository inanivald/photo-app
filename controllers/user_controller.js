const bcrypt = require('bcrypt');
const { matchedData, validationResult } = require('express-validator');
const models = require('../models');


//GET
const index = async (req, res) => {
	res.status(405).send({
		status: 'fail',
		message: 'Method Not Allowed.',
	});
	// const all_users = await models.User.fetchAll();

	// res.send({
	// 	status: 'success',
	// 	data: {
	// 		users: all_users
	// 	}
	// });
}

//GET /:userId

const show = async (req, res) => {
	res.status(405).send({
		status: 'fail',
		message: 'Method Not Allowed.',
	});
	// const user = await new models.User({ id: req.params.userId })
	// 	.fetch({ withRelated: ['albums', 'photos'] });

	// res.send({
	// 	status: 'success',
	// 	data: {
	// 		user,
	// 	}
	// });
}


//POST
const store = async (req, res) => {
	res.status(405).send({
		status: 'fail',
		message: 'Method Not Allowed.',
	});
	// // Finds the validation errors in this request and wraps them in an object with handy functions
	// const errors = validationResult(req);
	// if (!errors.isEmpty()) {
	// 	console.log("Create user request failed validation:", errors.array());
	// 	res.status(422).send({
	// 		status: 'fail',
	// 		data: errors.array(),
	// 	});
	// 	return;
	// }

	// const validData = matchedData(req);

	// // generate a hash of `validData.password`
	// try {
	// 	validData.password = await bcrypt.hash(validData.password, models.User.hashSaltRounds); // hash.salt is returned from bcrypt.hash()

	// } catch (error) {
	// 	res.status(500).send({
	// 		status: 'error',
	// 		message: 'Exception thrown when hashing the password.',
	// 	});
	// 	throw error;
	// }

	// try {
	// 	const user = await new models.User(validData).save();
	// 	console.log("Created new user successfully:", user);

	// 	res.send({
	// 		status: 'success',
	// 		data: {
	// 			user,
	// 		},
	// 	});

	// } catch (error) {
	// 	res.status(500).send({
	// 		status: 'error',
	// 		message: 'Exception thrown in database when creating a new user.',
	// 	});
	// 	throw error;
	// }
}

/**
 * Update a specific resource
 *
 * PUT /:userId
 */
const update = async (req, res) => {
	res.status(405).send({
		status: 'fail',
		message: 'Method Not Allowed.',
	});
	
	// const userId = req.params.userId;

	// const user = await new models.User({ id: userId }).fetch({ require: false });
	// if (!user) {
	// 	console.log("User to update was not found.");
	// 	res.status(404).send({
	// 		status: 'fail',
	// 		data: 'User Not Found',
	// 	});
	// 	return;
	// }

	// // Finds the validation errors in this request and wraps them in an object with handy functions
	// const errors = validationResult(req);
	// if (!errors.isEmpty()) {
	// 	console.log("Update user request failed validation:", errors.array());
	// 	res.status(422).send({
	// 		status: 'fail',
	// 		data: errors.array(),
	// 	});
	// 	return;
	// }

	// const validData = matchedData(req);

	// // generate a hash of `validData.password`
	// try {
	// 	validData.password = await bcrypt.hash(validData.password, models.User.hashSaltRounds); // hash.salt is returned from bcrypt.hash()

	// } catch (error) {
	// 	res.status(500).send({
	// 		status: 'error',
	// 		message: 'Exception thrown when hashing the password.',
	// 	});
	// 	throw error;
	// }

	// try {
	// 	const updatedUser = await user.save(validData);

	// 	res.send({
	// 		status: 'success',
	// 		data: {
	// 			user: updatedUser,
	// 		},
	// 	});

	// } catch (error) {
	// 	res.status(500).send({
	// 		status: 'error',
	// 		message: 'Exception thrown in database when updating a new user.',
	// 	});
	// 	throw error;
	// }
}

module.exports = {
	index,
	show,
	store,
	update,
	// destroy,
}