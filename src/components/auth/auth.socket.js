const {
  SAVE_PARENT_ADDRES_SESSION,
} = require('../../constants/socket-events');
const ChildSession = require('./childSession.schema');

module.exports = (socket) => {
    
  socket.on(SAVE_PARENT_ADDRES_SESSION, async (parentAddress) => {
    if (!parentAddress || parentAddress === '') {
      return;
    }

    let existedSession = await ChildSession.findOne({where: { parentEmailAddress: parentAddress }});
    if (!existedSession) {
      const newChildSession = new ChildSession({
        parentEmailAddress: parentAddress,
        childSocketId: socket.id
      })
      newChildSession.save().then(childSession => {
        console.log('Child session save success:' + childSession.childSocketId);
      }).catch(error => {
        console.log(error);
      });
    } else if (existedSession.childSocketId !== socket.id) {
      existedSession.childSocketId = socket.id;
      await existedSession.save();
    }
  });
};
