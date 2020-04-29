let socketio = {
  connect: ()=>{},
  io: {}
};

socketio.connect = (server) => {
  socketio.io = require('socket.io')(server);
  
  socketio.io.on('connection', (socket) => {
    require('../components/auth/auth.socket')(socket);
    require('../components/location/location.socket')(socket);
  });
}

module.exports = socketio;