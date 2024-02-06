require('dotenv').config();
const { Server } = require('socket.io');
const socketAuth = require('../middlewares/socketAuth');
const chatBLL = require('../bll/chatBL');
const formatDate = require('../utils/dateFormator');

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
    
    //handle new chat in case there isn't one
    //-----------------------------//
    socket.on('createChat', async ({ from, to }, callback) => {
      try {
          const chat = await chatBLL.addChat(from, to);
          callback({ success: true, chatId: chat._id.toString() }); // Send the chatId
      } catch (error) {
          console.error('Error in createChat:', error.message);
          callback({ success: false, error: error.message });
      }
    });
    //-----------------------------//
    

    //using rooms conecpt for private and gorup messaging
    //-----------------------------//
    socket.on("joinRoom", async ({roomId}) => {
      socket.join(roomId);
      console.log(`user joined room: ${roomId}`);

      const chatMessages = await chatBLL.getChatMessages(roomId);
      io.to(roomId).emit("loadChatMessages", chatMessages);
      
    });

    socket.on("leaveRoom", ({ roomId }) => {
      console.log(`User ${socket.id} left room: ${roomId}`);
      socket.leave(roomId);
    });

    socket.on("sendMessage", async ({roomId, from, to, message}) => {
      const date = formatDate();
  
      // Add the message directly, addChat is handled in addMessageToChat if necessary
      await chatBLL.addMessageToChat(roomId, from, to, message, date);
  
      // Update chat lists for both users
      const currentUserChatList = await chatBLL.getChatList(from);
      io.to(socket.id).emit("receiveChatList", currentUserChatList);
  
      const toUserOnline = onlineUsers.find(user => user.userName === to);
      if (toUserOnline) {
          const toUserChatList = await chatBLL.getChatList(to);
          io.to(toUserOnline.socketId).emit("receiveChatList", toUserChatList);
      }
  
      io.to(roomId).emit("receiveMessage", {
          from: from,
          text: message,
          time: date
      });
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



