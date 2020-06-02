const bcrypt = require('bcrypt');
const { matchedData, validationResult } = require('express-validator');
const models = require('../models');


//GET
const index = async (req, res) => {
	res.status(405).send({
		status: 'fail',
		message: 'Method Not Allowed.',
	});
}

//GET /:userId
const show = async (req, res) => {
	res.status(405).send({
		status: 'fail',
		message: 'Method Not Allowed.',
	});
	
}

//POST
const store = async (req, res) => {
	res.status(405).send({
		status: 'fail',
		message: 'Method Not Allowed.',
	});
}

// PUT
const update = async (req, res) => {
	res.status(405).send({
		status: 'fail',
		message: 'Method Not Allowed.',
	});
	
}

module.exports = {
	index,
	show,
	store,
	update,
	// destroy,
}