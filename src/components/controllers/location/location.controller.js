const locationService = require('@services/location/location.service');

exports.getChildLocation = async (req, res) => {
    return locationService.getChildLocation({email: req.user.email}, res);
}

exports.saveChildLocation = async (req, res) => {
    return locationService.saveChildLocation({...req.body}, res);
}

exports.getChildLocationByDate = async (req, res) => {
    return locationService.getChildLocationByDate({...req.body}, res);
}
