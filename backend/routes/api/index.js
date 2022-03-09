const router = require('express').Router();

router.use('/rooms', require('./rooms'));
router.use('/users', require('./users'));
router.use('/msgs', require('./messages'));

module.exports = router;