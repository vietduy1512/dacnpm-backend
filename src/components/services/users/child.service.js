const Child = require('@DAO/users/child.schema');
const User = require('@DAO/users/user.schema');

exports.initChild = async ({ parentId, deviceToken }, res) => {
  // TODO: expand to have multiple child
  // TODO Add otp token expiration
  let parent = await User.findOne({
    where: { id: parentId },
    include: [Child],
  });
  if (!parent) {
    return res.status(400).end();
  }
  let child = parent.children[0];
  if (!child) {
    const newChild = new Child({
      parentId: parent.id,
      deviceToken: deviceToken,
      fullname: 'SomeChild',
      // TODO: add name
    });
    await newChild.save();
    return res.json({ childId: newChild.id });
  } else {
    child.deviceToken = deviceToken;
    await child.save();
    return res.json({ childId: child.id });
  }
};

exports.addDeviceInfo = async ({ battery, apps, deviceToken }, res) => {
  try {
    let child = await Child.findOne({
      where: { deviceToken },
    });
    if (!child) {
      return res.status(400).end();
    } else {
      child.battery = battery;
      if (apps.length > 0) child.installedApps = apps;
      await child.save();
      return res.json({ childId: child.id });
    }
  } catch (error) {
    console.log(error);
  }
};

exports.getDeviceInfo = async ({ parentId }, res) => {
  try {
    let parent = await User.findOne({
      where: { id: parentId },
      include: [Child],
    });
    if (!parent) {
      return res.status(400).end();
    }
    let child = parent.children[0];
    if (!child) {
      return res.json({
        battery: 999,
        apps: [],
      });
    } else {
      return res.json({
        battery: child.battery,
        apps: child.installedApps,
      });
    }
  } catch (error) {
    console.log(error);
  }
};
