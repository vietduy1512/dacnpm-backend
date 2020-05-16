const Child = require('./child.schema');
const User = require('./user.schema');

exports.initChild = async (req, res) => {
    // TODO: expand to have multiple child
    // TODO: add OTP + clear invalid child data
    let parent = await User.findOne({where: { email: req.body.parentEmailAddress.trim() }});
    if (!parent) {
        return res.status(400).end(); 
    }
    
    let child = await Child.findOne({where: { parentId: parent.id }});
    if (!child) {
        const newChild = new Child({
            parentId: parent.id,
            fullname: "SomeChild"
            // TODO: add name
        })
        await newChild.save();
        return res.json({childId: newChild.id});
    }
    return res.json({childId: child.id});
}