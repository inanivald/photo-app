const express = require('express');
const router = express.Router();

/* GET home page. */
router.get('/', (req, res) => {
	res.send({ status: 'Inas photo app' });
});

router.use('/albums', require('./albums'));
router.use('/photos', require('./photos'));
router.use('/users', require('./users'));


module.exports = router;
