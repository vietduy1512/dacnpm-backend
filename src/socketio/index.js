module.exports = (server) => {
  const io = require('socket.io')(server);
  
  io.on('connection', (socket) => {
    require('../components/location/location.socket')(socket);
  });
}