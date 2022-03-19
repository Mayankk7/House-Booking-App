const User = require("../models/user")
const sendMail = require('../utils/mailer')


//function to allow a user to register 
const registerUser = async (req, res) => {

    const newuser = new User({
        name: req.body.name,
        email: req.body.email,
        password: req.body.password
    })

    try {
        const prevuser = await User.findOne({ email: req.body.email })
        if (prevuser) {
            return res.status(400).send("Email already exists")
        }

        const user = await newuser.save();

        let output = `
        <h1>Hey ! ${newuser.name}</h1><br/>
        <p>Your Account has been created successfully. </p>
        `

        sendMail(newuser.email, output)

        res.send("User Registered Successfully")

    } catch (error) {
        return res.status(400).json({ error });
    }
}

//function to allow a user to login 
const loginUser = async (req, res) => {

    const { email, password } = req.body

    try {
        const user = await User.findOne({ email: email, password: password })
        if (user) {
            const temp = {
                name: user.name,
                email: user.email,
                isAdmin: user.isAdmin,
                _id: user._id
            }
            res.send(temp)
        } else {
            return res.status(400).json({ message: "Login Failed" })
        }

    } catch (error) {
        return res.status(400).json({ error });

    }

}

module.exports = { registerUser, loginUser }