const express = require('express');
const router = express.Router();
const controller = require('./location.controller')
const auth = require('@middlewares/auth');

router.get('/getChildLocation', auth.isAuthenticated, controller.getChildLocation);

router.post('/saveChildLocation', controller.saveChildLocation);

router.post('/getChildLocationByDate', auth.isAuthenticated, controller.getChildLocationByDate);

router.post('/setCircleFromPoint', auth.isAuthenticated, controller.setCircleFromPoint);

module.exports = router;
