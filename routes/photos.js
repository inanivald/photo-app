const express = require('express');
const router = express.Router();
const { index, store, show, destroy } = require('../controllers/photo_controller.js');
const { createPhotoRules } = require('../validation_rules/photo');

//GET /photos
router.get('/', index);

//GET /photos/:photoId
router.get('/:photoId', show);

//POST /photos
router.post('/', createPhotoRules, store)

// DELETE /photos/:photoId
router.delete('/:photoId', destroy);

module.exports = router;