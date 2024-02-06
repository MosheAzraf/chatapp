const chatModel = require('../models/chatModel');
const userModel = require('../models/userModel');


const addChat = async (userName1, userName2) => {
    try {
        console.log({ from: userName1, to: userName2 });

        const user1 = await userModel.findOne({ userName: userName1 });
        const user2 = await userModel.findOne({ userName: userName2 });        
        
        if (!user1 || !user2) {
            throw new Error('one or both users not found.');
        };

        let chat = await chatModel.findOne({
            users: { $all: [user1._id, user2._id] }
        });

        if (!chat) {
            chat = await chatModel.create({
                users: [user1._id, user2._id]
            });

            await userModel.updateOne({_id: user1._id}, { $push: { chats: chat._id } });
            await userModel.updateOne({_id: user2._id}, { $push: { chats: chat._id } });
        }

        return chat;

    } catch (error) {
        console.error(error.message);
        throw error;
    }
};


const getChatList = async (userName) => {
    try {
        const user = await userModel.findOne({ userName: userName })
                                    .populate({
                                        path: 'chats',
                                        select: '-messages', // Exclude 'messages' field
                                        populate: {
                                            path: 'users',
                                            select: 'userName -_id' // Select only 'userName' field
                                        }
                                    });

        if (!user) {
            throw new Error('User does not exist.');
        };

        return user.chats;
    } catch (error) {
        console.error("Error in getChatList:", error.message);
        throw error;
    }
};



const addMessageToChat = async (chatId, from, to, message, date) => {
    try {
        let chat = await chatModel.findOne({_id: chatId});
        
        // If the chat doesn't exist, create it and then re-fetch it
        if (!chat) {
            await addChat(from, to);
            chat = await chatModel.findOne({_id: chatId});  // Re-fetch the chat
            if (!chat) {
                throw new Error('Unable to create or fetch the chat.');
            }
        }

        // Add the new message
        const newMessage = {
            from: from,
            text: message,
            time: date
        };

        chat.messages.push(newMessage);
        await chat.save();

    } catch (error) {
        console.error(error.message);
        throw error;
    }
};

const getChatMessages = async (chatId, from, to) => {
    try {
        const foundChat = await chatModel.findOne({_id:chatId});

        if(!foundChat) {
            await addChat(from, to);
            throw new Error(`chat ${chatId} is not exist.`);
        }

        return foundChat.messages;

    } catch (error) {
        console.error(error.message);
        throw error;
    }
}





module.exports = { 
    addChat,
    getChatList,
    addMessageToChat,
    getChatMessages
};