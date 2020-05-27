const bcrypt = require('bcrypt');
const { matchedData, validationResult } = require('express-validator');
const models = require('../models');


//GET
const index = async (req, res) => {
	const all_users = await models.User.fetchAll();

	res.send({
		status: 'success',
		data: {
			users: all_users
		}
	});
}

//GET /:userId

const show = async (req, res) => {
	const user = await new models.User({ id: req.params.userId })
		.fetch({ withRelated: ['albums', 'photos'] });

	res.send({
		status: 'success',
		data: {
			user,
		}
	});
}


//POST
const store = async (req, res) => {
	// Finds the validation errors in this request and wraps them in an object with handy functions
	const errors = validationResult(req);
	if (!errors.isEmpty()) {
		console.log("Create user request failed validation:", errors.array());
		res.status(422).send({
			status: 'fail',
			data: errors.array(),
		});
		return;
	}

	const validData = matchedData(req);

	// generate a hash of `validData.password`
	try {
		validData.password = await bcrypt.hash(validData.password, models.User.hashSaltRounds); // hash.salt is returned from bcrypt.hash()

	} catch (error) {
		res.status(500).send({
			status: 'error',
			message: 'Exception thrown when hashing the password.',
		});
		throw error;
	}

	try {
		const user = await new models.User(validData).save();
		console.log("Created new user successfully:", user);

		res.send({
			status: 'success',
			data: {
				user,
			},
		});

	} catch (error) {
		res.status(500).send({
			status: 'error',
			message: 'Exception thrown in database when creating a new user.',
		});
		throw error;
	}
}

module.exports = {
	index,
	show,
	store,
	// update,
	// destroy,
}