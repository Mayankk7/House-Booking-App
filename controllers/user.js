const User = require("../models/user")

//function to get all user data from database
const getUsers = async (req, res) => {

    try {

        const users = await User.find({})
        res.send(users);

    } catch (error) {
        return res.status(400).json({ error })

    }
}


module.exports = { getUsers }