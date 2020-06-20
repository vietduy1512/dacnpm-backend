const childService = require('@services/users/child.service');

exports.initChild = async (req, res) => {
    return childService.initChild({...req.body}, res); 
}
