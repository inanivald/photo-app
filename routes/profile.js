const express = require('express');
const router = express.Router();
const profileController = require('../controllers/profile_controller');

/* Get resource */
router.get('/', profileController.getProfile);

/* Get photos */
router.get('/photos', profileController.getPhotos);

/* Add photo */
router.post('/photos', profileController.addPhotos);


module.exports = router;
