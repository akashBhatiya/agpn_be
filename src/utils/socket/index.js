const userHandler = require("./user");

module.exports = (socket, io) => {
  userHandler(socket, io);
};
