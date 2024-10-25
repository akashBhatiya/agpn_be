const User = require("../../models/Users");

module.exports = (socket, io) => {
  socket.on("broadcastUserAdd", (data) =>
    socket.broadcast.emit("addUser", data)
  );
};
