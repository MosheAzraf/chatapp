const { Server } = require('socket.io');
require('dotenv').config();

const initSocket = (server) => {
  const io = new Server(server, {
    cors: {
      origin: process.env.CLIENT_URL,
      methods: ['*'],
      //allowedHeaders: ['my-custom-header'],
      credentials: true,
    },
  });

  io.on('connection', (socket) => {
    console.log(`user ${socket.id} connected.`);


    socket.on('disconnect', () => {
      console.log(`user ${socket.id} disconnected.`);
    });
  });

  return io;
};

module.exports = initSocket;


//add this after adding loggin in client side:

// io.use(async (socket, next) => {
//   try {
//     await verifyJWT(socket.request, {}, next);
//   } catch (error) {
//     // Handle authentication errors here
//     console.error('Socket authentication error:', error.message);
//     next(new Error('Authentication error.'));
//   }
// });