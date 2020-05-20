const User = require('../users/user.schema');
const OTPToken = require('./otpToken.schema');

exports.currentUser = async (req, res) => {
    if (req.user) {
        res.json({ user: req.user })
    } else {
        res.json({ user: null })
    }
}

exports.login = (req, res) => {
    res.json({ email: req.user.email });
}

exports.register = async (req, res) => {
    const newUser = new User({
        email: req.body.email,
        fullname: req.body.fullname,
        password: req.body.password
    })
    newUser.save().then(user => {
        return res.json({ email: newUser.email });
    }).catch(error => {
        return res.status(400).json({ errors: error.errors });
    });
}

exports.logout = (req, res) => {
    req.logout();
    res.clearCookie('connect.sid');
    res.end();
}

exports.generateOTP = async (req, res) => {
    // TODO Add otp token expiration
    let parent = await User.findOne({where: { email: req.user.email.trim() }});
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

exports.validateOTP = async (req, res) => {
    let otpToken = await OTPToken.findOne({where: { token: req.body.token }});
    if (otpToken) {
        return res.json({ parentId: otpToken.parentId });
    }
    return res.status(400).end();
}
