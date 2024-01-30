require('dotenv').config();
const { Server } = require('socket.io');
const socketAuth = require('../middlewares/socketAuth');
const chatBLL = require('../bll/chatBL');

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
    //just for testing
    const filteredOnlineUsers = onlineUsers.filter((user) => user.socketId !== socket.id)
    io.emit("getOnlineUsers", filteredOnlineUsers);
    //-----------------------------//

    //manage chat list
    //-----------------------------//
      socket.on("loadChatList", async ({userName}) => {
        const userChatList = await chatBLL.getChatList(userName);
        socket.emit("receiveChatList",userChatList);
      })
    //-----------------------------//
    


    //using rooms conecpt for private and gorup messaging
    //-----------------------------//
    socket.on("joinRoom", ({roomId}) => {
      socket.join(roomId);
      console.log(`user joined room: ${roomId}`);
    });

    socket.on("leaveRoom", ({ roomId }) => {
      console.log(`User ${socket.id} left room: ${roomId}`);
      socket.leave(roomId);
    });

    socket.on("sendMessage", async ({roomId,from, to, message,userName}) => {
      await chatBLL.addChat(from,to);
      //updates both users chat list in real-time.
      //current user
      const currentUserChatList = await chatBLL.getChatList(from);
      io.to(socket.id).emit("receiveChatList", currentUserChatList)

      //other user
      //check if other user is online
      const toUser = onlineUsers.find((user) => user.userName === to);
      //emit other user its chats list
      if(toUser) {
        const toUserChatList = await chatBLL.getChatList(toUser.userName);
        io.to(toUser.socketId).emit("receiveChatList", toUserChatList)
      } else {
        //push message to chat
      }

      console.log(message);
      io.to(roomId).emit("receiveMessage", {roomId:roomId, from:from, message:message});
    });
    //-----------------------------//


    socket.on('disconnect', () => {
      console.log(`user ${socket.id} disconnected.`);
      onlineUsers = onlineUsers.filter(user => user.socketId !== socket.id);
    });

  });

  return io;
};

module.exports = initSocket;



