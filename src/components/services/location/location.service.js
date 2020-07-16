const ChildLocation = require('@DAO/location/childLocation.schema');
const Child = require('@DAO/users/child.schema');
const User = require('@DAO/users/user.schema');
const { Op } = require("sequelize");
const moment = require('moment');


exports.getChildLocation = async ({email}, res) => {
    let parent = await User.findOne({
        where: { email: email.trim() },
        include: [Child]
    });
    if (!parent) {
        return res.status(400).end();
    }
    let child = parent.children[0];
    let childLocations = await ChildLocation.findAll({
        limit: 20,
        order: [['updatedAt', 'DESC']],
        where: { childId: child.id }
    });
    if (childLocations) {
        return res.json(childLocations);
    }
    return res.status(400).end();
}

exports.saveChildLocation = async ({parentId, latitude, longitude}, res) => {
    let parent = await User.findOne({
        where: { id: parentId },
        include: [Child]
    });
    if (!parent) {
        return res.status(400).end();
    }
    let child = parent.children[0];

    let childLocation = await ChildLocation.findOne({where: { childId: child.id }});
    if (childLocation && childLocation.latitude === latitude
        && childLocation.longitude === longitude) {
        childLocation.changed('updatedAt', true);
        await childLocation.save();
    } else {
        const newChildLocation = new ChildLocation({
            childId: child.id,
            latitude: latitude,
            longitude: longitude,
        })
        await newChildLocation.save();
    }
    return res.end();
}

exports.getChildLocationByDate = async ({email, startDate, toDate}, res) => {
    let parent = await User.findOne({
        where: { email: email.trim() },
        include: [Child]
    });
    if (!parent) {
        return res.status(400).end();
    }
    let child = parent.children[0];
    let childLocations = await ChildLocation.findAll({
        where: { 
            childId: child.id,
            createdAt: {
                [Op.between]: [new Date(startDate), new Date(toDate ? toDate : moment().toDate())]
            }
        }
    });
    // const childLocations = await sequelize.query("select * from `child-locations` where `childId` = :child `createdAt`::timestamp::date = :startDate", { type: QueryTypes.SELECT });

    if (childLocations) {
        return res.json(childLocations);
    }
    return res.status(400).end();
}