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

exports.setCircleFromPoint = async ({email, latitude, longitude, radius}, res) => {
    console.log(email, latitude, longitude, radius);

    let parent = await User.findOne({
        where: { email: email.trim() },
        include: [Child]
    });
    if (!parent) {
        return res.status(400).end();
    }

    let listPoints = [];
    const EARTH_RADIUS = 6378100.0; 
    let lat = latitude * Math.PI / 180.0; 
    let lon = longitude * Math.PI / 180.0; 

    for (t = 0; t <= Math.PI * 2; t += 0.3) { 
        // y 
        latPoint = lat + (radius / EARTH_RADIUS) * Math.sin(t); 
        // x 
        lonPoint = lon + (radius / EARTH_RADIUS) * Math.cos(t) / Math.cos(lat);

        // saving the location on circle as a point
        pointC = {
            'latC': latPoint * 180.0 / Math.PI,
            'lonC': lonPoint * 180.0 / Math.PI
        }

        listPoints.push(pointC);
    } 

    let child = parent.children[0];
    let childData = await Child.findOne({where: { id: child.id }});

    if (childData) {
        childData.update(
            {
                circle: listPoints
            },
            {
                where: {
                    id: child.id
                }
            });
    }
    if (childData.circle) {
        return res.json(childData.circle);
    }
    return res.status(400).end();
}