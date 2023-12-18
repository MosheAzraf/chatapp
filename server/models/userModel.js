const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    userName: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    friends: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User', default: [] }],
    groups: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Group', default: [] }],
    chats: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Chat', default:[] }],
    blockedUsers: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User', default: [] }]
});

// Create the User model
const User = mongoose.model('User', userSchema);

// Exclude sensitive information when converting to JSON
userSchema.set('toJSON', {
    versionKey: false,
    transform: (doc, ret) => {
        delete ret.password;
    }
});

module.exports = User;
