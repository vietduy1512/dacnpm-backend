const {
  CHILD_LOCATION_REQUEST,
  CHILD_LOCATION_RESPONSE,
} = require('../../constants/socket-events');

module.exports = (socket) => {
    
  socket.on(CHILD_LOCATION_REQUEST, () => {
    socket.emit(CHILD_LOCATION_REQUEST);
  });

  socket.on(CHILD_LOCATION_RESPONSE, data => {
    socket.emit(CHILD_LOCATION_RESPONSE, data);
  });
};
