const jwt = require('jsonwebtoken');
const cookie = require('cookie'); // Use the 'cookie' module for parsing

const socketAuthMiddleware = (socket, next) => {
  if (socket.handshake.headers && socket.handshake.headers.cookie) {
    const cookies = cookie.parse(socket.handshake.headers.cookie);
    const accessToken = cookies['accessToken'];

    if (accessToken) {
      jwt.verify(accessToken, process.env.ACCESS_TOKEN_SECRET, (err, decoded) => {
        if (err) {
          console.error('JWT verification error:', err.message);
          return next(new Error('Authentication error'));
        }
        socket.user = decoded;
        next();
      });
    } else {
      console.warn('No accessToken found in cookies');
      next(new Error('Authentication error'));
    }
  } else {
    console.warn('No cookies found in handshake headers');
    next(new Error('Authentication error'));
  }
};


module.exports = socketAuthMiddleware;
