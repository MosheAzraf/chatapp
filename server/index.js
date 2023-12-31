const express = require('express');
const app = express();
const http = require('http');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const connectDB = require('./configs/db');
const initSocket = require('./configs/socket');
const errorHandler = require('./middlewares/errorHandler');

const authRoute = require('./routes/authRoute');
const usersRoute = require('./routes/usersRoute');

connectDB();

app.use(cors({ origin: process.env.CLIENT_URL, credentials: true }));
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));


const SERVER_PORT = process.env.SERVER_PORT;
const server = http.createServer(app);
initSocket(server);

app.use('/api/auth', authRoute);
app.use('/api/user', usersRoute);

app.use(errorHandler);

server.listen(SERVER_PORT, () => {
  console.log(`server is running on http://localhost:${SERVER_PORT}`);
});
