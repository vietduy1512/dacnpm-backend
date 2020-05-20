const express = require('express');
const router = express.Router();
const controller = require('./auth.controller')
const validator = require('./auth.validator')
const passport = require('../../passport')
const auth = require('../../middlewares/auth');

router.post('/login', passport.authenticate('local'), controller.login);

router.post('/register', validator.register, controller.register);

router.post('/logout', controller.logout);

router.get('/currentUser', controller.currentUser);

router.get('/generateOTP', auth.isAuthenticated, controller.generateOTP);

router.post('/validateOTP', controller.validateOTP);

module.exports = router;
