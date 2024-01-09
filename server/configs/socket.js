require('dotenv').config();
const { Server } = require('socket.io');
const socketAuth = require('../middlewares/socketAuth');


const initSocket = (server) => {
  const io = new Server(server, {
    cors: {
      origin: process.env.CLIENT_URL,
      methods: ['*'], // can be change to => methods: ['GET', 'POST'],
      credentials: true,
    },
  });

  let onlineUsers = [];

  io.use(socketAuth);

  io.on('connection', (socket) => {
    console.log(`user ${socket.id} connected.`);
    const userName = socket.handshake.query.userName;
    console.log(`user with userName: ${userName} connected.`);
    onlineUsers.push({socketId: socket.id, userName: userName});

    const filteredUsers = () => {
      return onlineUsers.filter((user) => user.socketId !== socket.id);
    };

    io.emit("getOnlineUsers", filteredUsers());


    socket.on('disconnect', () => {
      console.log(`user ${socket.id} disconnected.`);
      onlineUsers = onlineUsers.filter(user => user.socketId !== socket.id);
    });

  });

  return io;
};

module.exports = initSocket;



