const express = require('express');
const router = express.Router();
const { index, show, store, update } = require('../controllers/user_controller');
const { createRules, updateRules } = require('../validation_rules/user');

//GET 
router.get('/', index);

//GET /:userId
router.get('/:userId', show);

//STORE
router.post('/', createRules, store);

/* Update a specific resource */
router.put('/:userId', updateRules, update);

// /* Destroy a specific resource */
// router.delete('/:userId', userController.destroy);

module.exports = router;
