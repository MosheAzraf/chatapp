const mongoose = require('mongoose');

const chatSchema = new mongoose.Schema({
    users: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true }],
    messages: [{
        sender: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
        text: { type: String, required: true },
        timestamp: { type: Date, default: Date.now },
    },
    {default: []}
    ],
});

const Chat = mongoose.model('Chat', chatSchema);
module.exports = Chat;
