const express = require('express');
const router = express.Router();
const { index, show, store } = require('../controllers/photo_controller.js');
const photoValidationRules = require('../validation_rules/photo');

//GET
router.get('/', index);

//GET /:photoId
router.get('/:photoId', show);

//POST
router.post('/', photoValidationRules.createPhotoRules, store)



module.exports = router;