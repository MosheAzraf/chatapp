require('dotenv').config();
const { Server } = require('socket.io');
const Redis = require('ioredis');
const socketAuth = require('../middlewares/socketAuth');



const redisClient = new Redis();

const initSocket = (server) => {
  const io = new Server(server, {
    cors: {
      origin: process.env.CLIENT_URL,
      methods: ['*'], // can be change to => methods: ['GET', 'POST'],
      credentials: true,
    },
  });




  io.use(socketAuth);

  let users = [];




  io.on('connection', (socket) => {
    console.log(`user ${socket.id} connected.`);


    socket.on('disconnect', () => {
      console.log(`user ${socket.id} disconnected.`);
    });
  });

  return io;
};

module.exports = initSocket;




//auth example?:
// io.use(async (socket, next) => {
//   try {
//     await verifyJWT(socket.request, {}, next);
//   } catch (error) {
//     // Handle authentication errors here
//     console.error('Socket authentication error:', error.message);
//     next(new Error('Authentication error.'));
//   }
// });