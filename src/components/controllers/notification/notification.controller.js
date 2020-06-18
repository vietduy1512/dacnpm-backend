const Child = require('../../repositories/users/child.schema');
const User = require('../../repositories/users/user.schema');

const admin = require("firebase-admin");
const serviceAccount = require("@infrastructure/secrets/serviceAccountKey.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://dacnpm2020-firebase.firebaseio.com"
});

exports.sendNotificationToChild = async (req, res) => {
    let parent = await User.findOne({
        where: { email: req.user.email.trim() },
        include: [Child]
    });
    if (!parent) {
        return res.status(400).end();
    }
    let child = parent.children[0];

    var message = {
        notification: {
            title: 'Remote push notification', 
            body: req.body.content 
        },
        token: child.deviceToken
    };
    admin.messaging().send(message)
        .then((response) => {
            console.log("Successfully sent message: ", response);
        }).catch((err) => {
            console.log("Error sending message: ", err);
        })
    return res.end();
}
