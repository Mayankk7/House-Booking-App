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


//function to delete a user from database 
const deleteUser = async (req, res) => {
    try {
        const userid = req.params.id
        await User.findByIdAndDelete({ _id: userid })
        res.status(200).send({ message: "User Deleted Successfully !" })
    } catch (error) {
        res.status(404).send({ message: "Server Error" })
    }
}

module.exports = { getUsers, deleteUser }