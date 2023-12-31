const jwt = require('jsonwebtoken');
const User = require('../models/userModel');
require('dotenv').config();

const verifyJWT = async (req, res, next) => {
    try {
        const tokenFromCookie = req.cookies.accessToken ;

        if (!tokenFromCookie) {
            return res.status(403).json({"message":"forbidden, missing token. "})
        }

        const decoded = jwt.verify(tokenFromCookie, process.env.ACCESS_TOKEN_SECRET);
        const foundUser = await User.findOne({ userName: decoded.userName });

        if(!foundUser) {
            return res.status(404).json({"message":"user not found."});
        }
        
        req.user = foundUser;
        next();
    } catch (error) {
        next(error);
    }
};

module.exports = verifyJWT;
