const User = require('../models/userModel');
const Chat = require('../models/chatModel');
const Group = require('../models/groupModel');

const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const verifyJWT = require('../middlewares/verifyJWT');
require('dotenv').config();

const registerNewUser = async (req, res, next) => {
    const {firstName, lastName, userName, password} = req.body;
    if(!firstName || firstName.length === 0
        ||!lastName || lastName.length === 0
        ||!userName || userName.length === 0
        ||!password || password.length === 0
        ) {
            return res.status(400).json({'message':'first Name, Last Name, User Name and Password are required'})
    }
    
    const duplicate = await User.findOne({userName});

    if(duplicate) {
        return res.status(409).json({message:"user already exist."});
    };

    try {
        const hashedPassword = await bcrypt.hash(password, 10);
        const result = await User.create({
            firstName: firstName,
            lastName: lastName,
            userName: userName,
            password: hashedPassword
        });

        console.log("new user created:", result);
        return res.status(201).json({'success': `User ${userName} created.`});

    } catch (error) {
        return res.status(500).json({'message':error.message});
    }
}

const login = async (req, res, next) => {
    const { userName, password} = req.body;
    if(!userName || userName.trim().length === 0 
       || !password || password.trim().length === 0
    ) {
        return res.status(400).json({'message':'user name and password are required.'});
    }

    const foundUser = await User.findOne({userName});
            
    if(!foundUser) {
        return res.status(400).json({"message":"Invalid credentials."});
    };

    const { id, firstName, lastName, userName: foundUserName } = foundUser;

    const passwordIsValid = await bcrypt.compare(password, foundUser.password);
    if(passwordIsValid) {
        const accessToken = jwt.sign(
            {"userName": foundUser.userName},
            process.env.ACCESS_TOKEN_SECRET,
            {expiresIn:'1d'}
        );
        
        //cookies
        res.cookie('accessToken', accessToken, {
            httpOnly: true, // The cookie is not accessible via client-side scripts
            // secure: process.env.NODE_ENV === 'production', // Only send the cookie over HTTPS in production
            sameSite: 'strict', // Helps protect against CSRF attacks
            maxAge: 24 * 60 * 60 * 1000, // Cookie expires in 1 day (adjust as needed)
        });

        const userDataToSend = { id, firstName, lastName, userName: foundUserName };

        return res.status(200).json({"message":"Login successful", user: userDataToSend});
         
    } else {
        return res.sendStatus(401);
    }
    
};

const logOut = async (req,res, next) => {
    await res.clearCookie('accessToken');
    return res.status(200).json({message:"Logout successful"});
}

const verifyAuth = async (req, res, next) => {
    try {
        if (!req.cookies['accessToken']) {
            return res.status(401).json({ message: 'Authentication error. Token missing.' });
        }

        await verifyJWT(req, res, next);

        const foundUser = req.user;
        console.log(foundUser);

        if (!foundUser) {
            return res.status(401).json({ message: 'Authentication error. User not found.' });
        }

        return res.status(200).json({ message: 'verified.'});
    } catch (error) {
        return res.status(500);
    }
}

module.exports = {
    registerNewUser,
    login,
    logOut,
    verifyAuth
}