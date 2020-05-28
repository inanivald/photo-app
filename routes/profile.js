const express = require('express');
const router = express.Router();
const profileController = require('../controllers/profile_controller');

/* Get resource */
router.get('/', profileController.getProfile);

/* Get photos */
router.get('/photos', profileController.getPhotos);

/* Add photo */
router.post('/photos', profileController.addPhoto);

/* Get albums */
router.get('/albums', profileController.getAlbums);

/* Add album */
router.post('/albums', profileController.addAlbum);




module.exports = router;
