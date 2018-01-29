var express = require('express')
, router = express.Router();

router.use('/tasks', require('./task'));
router.use('/users', require('./user'));


module.exports = router