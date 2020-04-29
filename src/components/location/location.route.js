const express = require('express');
const router = express.Router();
const controller = require('./location.controller')
const auth = require('../../middlewares/auth');

router.get('/getChildLocation', auth.isAuthenticated, controller.getChildLocation);

module.exports = router;
