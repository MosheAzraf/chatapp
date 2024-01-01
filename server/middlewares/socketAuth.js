const jwt = require('jsonwebtoken');
const cookie = require('cookie'); // Use the 'cookie' module for parsing

const socketAuthMiddleware = (socket, next) => {
  if (socket.handshake.headers && socket.handshake.headers.cookie) {
    // Parse the cookies using 'cookie'
    const cookies = cookie.parse(socket.handshake.headers.cookie);

    const accessToken = cookies['accessToken']; // The name of your cookie

    if (accessToken) {
      jwt.verify(accessToken, process.env.ACCESS_TOKEN_SECRET, (err, decoded) => {
        if (err) {
          return next(new Error('Authentication error'));
        }
        socket.user = decoded; // Add the decoded user to the socket for future use
        next();
      });
    } else {
      next(new Error('Authentication error'));
    }
  } else {
    next(new Error('Authentication error'));
  }
};

module.exports = socketAuthMiddleware;
