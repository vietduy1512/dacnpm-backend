const Child = require('@DAO/users/child.schema');
const User = require('@DAO/users/user.schema');

exports.initChild = async ({parentId, deviceToken}, res) => {
    // TODO: expand to have multiple child
    // TODO Add otp token expiration
    let parent = await User.findOne({
        where: { id: parentId },
        include: [Child]
    });
    if (!parent) {
        return res.status(400).end();
    }
    let child = parent.children[0];
    if (!child) {
        const newChild = new Child({
            parentId: parent.id,
            deviceToken: deviceToken,
            fullname: "SomeChild"
            // TODO: add name
        })
        await newChild.save();
        return res.json({childId: newChild.id});
    } else {
        child.deviceToken = deviceToken
        await child.save();
        return res.json({childId: child.id});
    }
}
