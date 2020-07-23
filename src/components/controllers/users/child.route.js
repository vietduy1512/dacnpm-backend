const express = require('express');
const router = express.Router();
const controller = require('./child.controller')

router.post('/initChild', controller.initChild);
router.post('/device-info', controller.addDeviceInfo);
router.get('/device-info', controller.getDeviceInfo);

module.exports = router;
