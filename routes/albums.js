const express = require('express');
const router = express.Router();
const { index, show, store } = require('../controllers/album_controller');
const { createAlbumRules } = require('../validation_rules/album');

//GET
router.get('/', index)

//GET /:albumId
router.get('/:albumId', show);

//POST
router.post('/', createAlbumRules, store)

module.exports = router;