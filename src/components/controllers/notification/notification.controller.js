const notificationService = require('@services/notification/notification.service');

exports.sendNotificationToChild = async (req, res) => {
    return notificationService.sendNotificationToChild({email: req.user.email, content: req.body.content}, res); 
}

exports.sendEmergencyMessage = async (req, res) => {
    return notificationService.sendEmergencyMessage({deviceToken: req.body.deviceToken}, res); 
}
