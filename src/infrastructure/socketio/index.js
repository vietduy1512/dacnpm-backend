let socketio = {
  connect: ()=>{},
  io: {}
};

socketio.connect = (server) => {
  const io = require('socket.io')(server);
  socketio.io = io;
  
  io.on('connection', (socket) => {
    require('@components/auth/auth.socket')(socket, io);
    require('@components/location/location.socket')(socket, io);
  });
}

module.exports = socketio;