const ChildLocation = require('./childLocation.schema');
const Child = require('../users/child.schema');
const User = require('../users/user.schema');

exports.getChildLocation = async (req, res) => {
    let parent = await User.findOne({
        where: { email: req.user.email.trim() },
        include: [Child]
    });
    if (!parent) {
        return res.status(400).end();
    }
    let child = parent.children[0];
    let childLocation = await ChildLocation.findOne({where: { childId: child.id }});
    if (childLocation) {
        return res.json(childLocation);
    }
    return res.status(400).end();
}

exports.saveChildLocation = async (req, res) => {
    let parent = await User.findOne({
        where: { email: req.body.parentEmailAddress.trim() },
        include: [Child]
    });
    if (!parent) {
        return res.status(400).end();
    }
    let child = parent.children[0];
    let childLocation = await ChildLocation.findOne({where: { childId: child.id }});
    if (!childLocation) {
        const newChildLocation = new ChildLocation({
            childId: child.id,
            latitude: req.body.latitude,
            longitude: req.body.longitude,
        })
        await newChildLocation.save();
    } else {
        childLocation.latitude = req.body.latitude;
        childLocation.longitude = req.body.longitude;
        await childLocation.save();
    }
    return res.end();
}
