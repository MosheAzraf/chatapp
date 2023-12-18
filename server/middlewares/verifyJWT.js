const jwt = require('jsonwebtoken');
const User = require('../models/userModel');
require('dotenv').config();

const verifyJWT = async (req, res, next) => {
    try {
        const tokenFromCookie = req.cookies.accessToken || req.handshake.query.token;

        if (!tokenFromCookie) {
            throw { status: 401, message: 'Authentication error. Token missing.' };
        }

        const decoded = jwt.verify(tokenFromCookie, process.env.ACCESS_TOKEN_SECRET);
        const foundUser = await User.findOne({ userName: decoded.userName });

        if (!foundUser) {
            throw { status: 401, message: 'Authentication error. User not found.' };
        }

        req.user = foundUser;
        next();
    } catch (error) {
        next(error);
    }
};

module.exports = verifyJWT;
