const User = require('@DAO/users/user.schema');
const OTPToken = require('@DAO/auth/otpToken.schema');

exports.currentUser = async ({user}, res) => {
    if (user) {
        res.json({ user: user })
    } else {
        res.json({ user: null })
    }
}

exports.login = async ({email, deviceToken}, res) => {
    let parent = await User.findOne({where: { email: email.trim() }});
    if (!parent) {
        return res.status(400).end();
    }
    parent.deviceToken = deviceToken;
    console.log(deviceToken);
    await parent.save()
    res.json({ email: email });
}

exports.register = async ({email, fullname, password}, res) => {
    const newUser = new User({
        email: email,
        fullname: fullname,
        password: password
    })
    newUser.save().then(user => {
        return res.json({ email: user.email });
    }).catch(error => {
        return res.status(400).json({ errors: error.errors });
    });
}

exports.logout = ({logout}, res) => {
    logout();
    res.clearCookie('connect.sid');
    res.end();
}

exports.generateOTP = async ({email}, res) => {
    // TODO Add otp token expiration
    let parent = await User.findOne({where: { email: email.trim() }});
    if (!parent) {
        return res.status(400).end();
    }

    let token = generateOTP();
    let existedOtpToken = await OTPToken.findOne({where: { parentId: parent.id }});
    if (existedOtpToken) {
        existedOtpToken.token = token;
        await existedOtpToken.save()
    } else {
        let otpToken = new OTPToken({
            parentId: parent.id,
            token: token
        })
        await otpToken.save()
    }
    res.json({ token: token });
}

function generateOTP() {
    const otpLength = 6;
    var digits = '0123456789';
    let OTP = '';
    for (let i = 0; i < otpLength; i++ ) {
        OTP += digits[Math.floor(Math.random() * 10)];
    }
    return OTP;
}

exports.validateOTP = async ({token}, res) => {
    let otpToken = await OTPToken.findOne({where: { token: token }});
    if (otpToken) {
        return res.json({ parentId: otpToken.parentId });
    }
    return res.status(400).end();
}
