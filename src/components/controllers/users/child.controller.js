const childService = require('@services/users/child.service');

exports.initChild = async (req, res) => {
  return childService.initChild({ ...req.body }, res);
};

exports.addDeviceInfo = async (req, res) => {
  return childService.addDeviceInfo({ ...req.body }, res);
};

exports.getDeviceInfo = async (req, res) => {
  return childService.getDeviceInfo({ ...req.query }, res);
};
