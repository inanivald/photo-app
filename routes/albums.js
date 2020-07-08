const express = require('express');
const router = express.Router();
const { index, storeAlbum, show, addPhotos, removePhoto, destroy } = require('../controllers/album_controller');
const { addPhotosRules, createAlbumRules } = require('../validation_rules/album');

//GET /albums
router.get('/', index)

//GET /albums/:albumId
router.get('/:albumId', show);

//POST /albums
router.post('/', createAlbumRules, storeAlbum)

// POST /albums/:albumId
router.post('/:albumId/photos', addPhotosRules, addPhotos);

// DELETE /albums/:albumId
router.delete('/:albumId', destroy);

// DELETE /albums/:albumId/photos/:photoId
router.delete('/:albumId/photos/:photoId', removePhoto);

module.exports = router;