const express = require('express');
const router = express.Router();
const controller = require('./child.controller')

router.post('/initChild', controller.initChild);

module.exports = router;
