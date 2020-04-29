const express = require('express');
const router = express.Router();
const controller = require('./auth.controller')
const validator = require('./auth.validator')
const passport = require('../../passport')

router.post('/login', passport.authenticate('local'), controller.login);

router.post('/register', validator.register, controller.register);

router.post('/logout', controller.logout);

router.get('/currentUser', controller.currentUser);

module.exports = router;
