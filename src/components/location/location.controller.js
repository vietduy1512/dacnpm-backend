const ChildSession = require('../auth/childSession.schema');
const socketio = require('../../socketio');
const {
    CHILD_LOCATION_REQUEST,
  } = require('../../constants/socket-events');

exports.getChildLocation = async (req, res) => {
    let childSession = await ChildSession.findOne({where: { parentEmailAddress: req.user.email }});
    if (childSession) {
        socketio.io.to(childSession.childSocketId).emit(CHILD_LOCATION_REQUEST);
        return res.end();
    }
    return res.status(400).end();
}
