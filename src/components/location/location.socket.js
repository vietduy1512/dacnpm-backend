const {
  CHILD_LOCATION_REQUEST,
  CHILD_LOCATION_RESPONSE,
} = require('../../constants/socket-events');
const ChildSession = require('../auth/childSession.schema');

module.exports = (socket, io) => {
    
  socket.on(CHILD_LOCATION_REQUEST, async (parentAddress, callback) => {
    let childSession = await ChildSession.findOne({where: { parentEmailAddress: parentAddress }});
    if (!childSession) {
      return;
    }

    if (childSession.parentSocketId !== socket.id) {
      childSession.parentSocketId = socket.id;
      await childSession.save();
    }
    callback();
  });

  socket.on(CHILD_LOCATION_RESPONSE, async (locationData) => {
    let childSession = await ChildSession.findOne({where: { childSocketId: socket.id }});
    if (childSession && childSession.parentSocketId) {
      socket.to(childSession.parentSocketId).emit(CHILD_LOCATION_RESPONSE, locationData);
    }
  });
};
