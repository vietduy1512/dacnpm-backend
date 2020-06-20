const notificationService = require('@services/notification/notification.service');

exports.sendNotificationToChild = async (req, res) => {
    return notificationService.sendNotificationToChild({email: req.user.email, content: req.body.content}, res); 
}
