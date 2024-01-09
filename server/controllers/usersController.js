const User = require('../models/userModel');

const getMe = async (req, res, next) => {
    try {
        const user = req.user;
        if(!user) {
            return res.status(404).json({message:"user not found."});
        }

        const userData = {
            firstName:user.firstName,
            lastName:user.lastName,
            userName:user.userName,
        }

        res.status(200).json(userData);

    } catch (error) {
        next(error);
    }
};


const findUser = async (req,res,next) => {
    const {search} = req.query;
    console.log("search param:",searchParam)
    try {
        const users = await User.find(
            {userName: { $regex: search, $options:"i"}}
        );
        
        if(!users) {
            return res.status(400).json({message:`no users found with matching name: ${searchParam}`});
        }

        return res.status(200).json({results: users});


    } catch (error) {
        return res.status(500).json({message:error.mes});
    }
}

module.exports = {
    getMe,
    findUser
}
