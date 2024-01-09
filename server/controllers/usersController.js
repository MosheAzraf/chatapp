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


const findUsers = async (req, res, next) => {
    const { search } = req.query;
    console.log("search param:", search)
    try {
        const query = {
            $or: [
                { userName: { $regex: search, $options: "i" } },
                { firstName: { $regex: search, $options: "i" } },
                { lastName: { $regex: search, $options: "i" } }
            ]
        };

        const users = await User.find(query).select("userName firstName lastName");

        return res.status(200).json({ results: users });

    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
}


module.exports = {
    getMe,
    findUsers
}
