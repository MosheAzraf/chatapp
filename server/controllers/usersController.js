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
}

module.exports = {
    getMe
}
