const Child = require('@DAO/users/child.schema');
const User = require('@DAO/users/user.schema');

const admin = require("firebase-admin");
const serviceAccount = require("@infrastructure/secrets/serviceAccountKey.json");

admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    databaseURL: "https://dacnpm2020-firebase.firebaseio.com"
});

exports.sendNotificationToChild = async ({email, content}, res) => {
    let parent = await User.findOne({
        where: { email: email.trim() },
        include: [Child]
    });
    if (!parent) {
        return res.status(400).end();
    }
    let child = parent.children[0];

    var message = {
        notification: {
            title: 'Remote push notification', 
            body: content 
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

exports.sendEmergencyMessage = async ({deviceToken}, res) => {
    let child = await Child.findOne({
        where: { deviceToken: deviceToken },
        include: [User]
    });
    if (!child) {
        return res.status(400).end();
    }
    let parent = child.user;

    var message = {
        data: {
            type: 'EMERGENCY',
        },
        token: parent.deviceToken
    };
    admin.messaging().send(message)
        .then((response) => {
            console.log("Successfully sent message: ", response);
        }).catch((err) => {
            console.log("Error sending message: ", err);
        })
    return res.end();
}