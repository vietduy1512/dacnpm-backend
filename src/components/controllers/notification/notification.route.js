const express = require('express');
const router = express.Router();
const controller = require('./notification.controller')
const auth = require('@middlewares/auth');

router.post('/sendNotificationToChild', auth.isAuthenticated, controller.sendNotificationToChild);

module.exports = router;
