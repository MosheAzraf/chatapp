const mongoose = require('mongoose');

const chatSchema = new mongoose.Schema({
    users: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true }],
    messages: [{
        from: { type: String, required: true },
        text: { type: String, required: true },
        time: { teype:String },
    },
    {default: []}
    ],
});

const Chat = mongoose.model('Chat', chatSchema);
module.exports = Chat;
