const mongoose = require('mongoose');

const connectDB = () => {
  mongoose
    .connect('mongodb://localhost:27017/chatapp')
    .then(() => console.log('Connected to chatapp db.'))
    .catch((error) => console.log(error));
};

module.exports = connectDB;