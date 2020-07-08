const express = require('express');
const router = express.Router();
const auth = require('../controllers/middlewares/auth');
const authController = require('../controllers/auth_controller');
const userValidationRules = require('../validation_rules/user');

//GET home page
router.get('/', (req, res) => {
	res.send({ status: 'Inas photo app' });
});


router.use('/albums', [auth.validateJwtToken], require('./albums'));
router.use('/photos', [auth.validateJwtToken], require('./photos'));

// login and get JWT access-token
router.post('/login', authController.login);

// register user
router.post('/register', [userValidationRules.createRules], authController.register);


module.exports = router;
