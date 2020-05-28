const express = require('express');
const router = express.Router();
const auth = require('../controllers/middlewares/auth');
const authController = require('../controllers/auth_controller');
const userValidationRules = require('../validation_rules/user');

//GET home page
router.get('/', (req, res) => {
	res.send({ status: 'Inas photo app' });
});

router.use('/albums', require('./albums'));
router.use('/photos', require('./photos'));
router.use('/users', require('./users'));

// login and get JWT access-token
router.post('/login', authController.login);

// register user
router.post('/register', [userValidationRules.createRules], authController.register);

// validate JWTs
router.use('/profile', [auth.validateJwtToken], require('./profile'));


module.exports = router;
