const authService = require('@services/auth/auth.service');

exports.currentUser = async (req, res) => {
    return authService.currentUser({user: req.user}, res);
}

exports.login = (req, res) => {
    return authService.login({email: req.user.email, deviceToken: req.body.deviceToken}, res);
}

exports.register = async (req, res) => {
    return authService.register({...req.body}, res);
}

exports.logout = (req, res) => {
    return authService.logout({logout: req.logout}, res);
}

exports.generateOTP = async (req, res) => {
    return authService.generateOTP({email: req.user.email}, res);
}

exports.validateOTP = async (req, res) => {
    return authService.validateOTP({token:  req.body.token}, res);
}
