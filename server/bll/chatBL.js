const chatModel = require('../models/chatModel');
const userModel = require('../models/userModel');

//add chat related to specific 2 users.
//updates the chat list in user model for both users
//so that way when other user is not online, it will automatically add a chat to its list.

// - maybe change params to "from" and "to".
const addChat = async (userName1, userName2) => {
    try {
        console.log({
            from:userName1,
            to:userName2
        });

        const user1 = await userModel.findOne({userName:userName1});
        const user2 = await userModel.findOne({userName:userName2});        
        
        if(!user1 || !user2){
            throw new Error('one or both users not found.');
        };

        const isChatExist = await chatModel.findOne({
            users: { $all: [user1._id, user2._id] }
        });

        if(isChatExist){
            throw new Error(`chat beween users ${userName1} and ${userName2} already exist`);
        };

        const newChat = await chatModel.create({
            users:[user1._id, user2._id]
        });

        console.log(`successfuly created chat with ${user1.userName} and ${user2.userName}`);


        await userModel.updateOne({_id: user1._id}, { $push: { chats: newChat._id } });
        await userModel.updateOne({_id: user2._id}, { $push: { chats: newChat._id } });

    
    } catch(error) {
        console.error(error.message);
    }
};

const getChatList = async (userName) => {
    try {
        const user = await userModel.findOne({ userName: userName })
                                    .populate({
                                        path: 'chats',
                                        populate: {
                                            path: 'users',
                                            select: 'userName'
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





module.exports = { 
    addChat,
    getChatList
};