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
    const userName = socket.handshake.query.userName;
    console.log(`user: ${userName} conntected, socketId: ${socket.id}`);
    onlineUsers.push({ socketId: socket.id, userName: userName });
    


    //manage online users
    //-----------------------------//
    //emit users without the current one..
    const filteredOnlineUsers = onlineUsers.filter((user) => user.socketId !== socket.id)
    io.emit("getOnlineUsers", filteredOnlineUsers);
    //-----------------------------//

    //=================================//

    //using rooms conecpt for private and gorup messaging, lets test it..
    //-----------------------------//
    socket.on("joinRoom", ({roomId}) => {
      console.log(`user joined room: ${roomId}`);
      socket.join(roomId);
    }); 

    socket.on("leaveRoom", ({ roomId }) => {
      console.log(`User ${socket.id} left room: ${roomId}`);
      socket.leave(roomId);
    });

    socket.on("sendMessage", ({roomId, message}) => {
      io.to(roomId).emit("receiveMessage", message);
    })
    //-----------------------------//


    socket.on('disconnect', () => {
      console.log(`user ${socket.id} disconnected.`);
      onlineUsers = onlineUsers.filter(user => user.socketId !== socket.id);
    });

  });

  return io;
};

module.exports = initSocket;



