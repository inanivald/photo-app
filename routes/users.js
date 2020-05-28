const express = require('express');
const router = express.Router();
const { index, show, store } = require('../controllers/user_controller');
const { createRules } = require('../validation_rules/user');

//GET 
router.get('/', index);

//GET /:userId
router.get('/:userId', show);

//STORE
router.post('/', createRules, store);

// /* Update a specific resource */
// router.put('/:userId', userValidationRules.updateRules, userController.update);

// /* Destroy a specific resource */
// router.delete('/:userId', userController.destroy);

module.exports = router;
