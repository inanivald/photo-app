/**
 * Auth Controller
 */

const bcrypt = require('bcrypt');
const { matchedData, validationResult } = require('express-validator');
const jwt = require('jsonwebtoken');
const { User } = require('../models');

//POST /login

const login = async (req, res) => {
	const user = await User.login(req.body.email, req.body.password);
	console.log(req.body)
	if (!user) {
		res.status(401).send({
			status: 'fail',
			data: 'Authentication Required.',
		});
		return;
	}

	// construct jwt payload
	const payload = {
		data: {
			id: user.get('id'),
			email: user.get('email'),
		},
	};

	// sign payload and get access-token
	const access_token = jwt.sign(payload, process.env.ACCESS_TOKEN_SECRET, { expiresIn: process.env.ACCESS_TOKEN_LIFETIME || '1h' });


	res.send({
		status: 'success',
		data: {
			access_token,
		},
	});
}



//POST /register

const register = async (req, res) => {
	
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

	try {
		validData.password = await bcrypt.hash(validData.password, User.hashSaltRounds);

	} catch (error) {
		res.status(500).send({
			status: 'error',
			message: 'Exception thrown when hashing the password.',
		});
		throw error;
	}

	try {
		const user = await new User(validData).save();
		console.log("Created new user successfully:", user);

		res.status(201).send({
			status: 'success',
			data: null,
		});

	} catch (error) {
		res.status(500).send({
			status: 'error',
			message: 'Exception thrown in database when creating a new user.',
		});
		throw error;
	}
}

//Get token from HTTP headers

const getTokenFromHeaders = (req) => {
	if (!req.headers.authorization) {
		return false;
	}

	const [authType, token] = req.headers.authorization.split(' ');

	if (authType.toLowerCase() !== "bearer") {
		return false;
	}

	return token;
}

module.exports = {
	login,
	register,
	getTokenFromHeaders,
}
