const express = require('express');
const router = express.Router();
const profileController = require('../controllers/profile_controller');
const { createPhotoRules } = require('../validation_rules/photo');
const { createAlbumRules } = require('../validation_rules/album');

/* Get resource */
router.get('/', profileController.getProfile);

/* Get photos */
router.get('/photos', profileController.getPhotos);

/* Get photo */
router.get('/photos/:photoId', profileController.getPhoto);

/* Add photo */
router.post('/photos', createPhotoRules, profileController.addPhoto);

/* Get albums */
router.get('/albums', profileController.getAlbums);

/* Get album */
router.get('/albums/:albumId', profileController.getAlbum);

/* Add album */
router.post('/albums', createAlbumRules, profileController.addAlbum);

/* Delete album */
router.delete('/albums/:albumId', profileController.deleteAlbum);





module.exports = router;
