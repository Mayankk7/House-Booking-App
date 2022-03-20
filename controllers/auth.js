const User = require("../models/user")
const sendMail = require('../utils/mailer')
const bcrypt = require("bcrypt")
const { uuid } = require("uuidv4")
const Token = require("../models/token")

//function to allow a user to register 
const registerUser = async (req, res) => {
    let hashpassword = await bcrypt.hash(req.body.password, 3)
    const newuser = new User({
        name: req.body.name,
        email: req.body.email,
        password: hashpassword
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
        let temp = {}
        const user = await User.findOne({ email: email })
        if (user) {
            await bcrypt.compare(password, user.password).then(res => {

                temp = {
                    name: user.name,
                    email: user.email,
                    isAdmin: user.isAdmin,
                    _id: user._id
                }
            })
            const sessionuser = temp
            res.send(sessionuser)
        } else {
            res.status(401).send({ message: "User not found" })
        }
    }
    catch (error) {
        return res.status(400).json({ error });

    }



}


//function that allows a user to generate a reset password request 
const forgotPassword = async (req, res) => {
    try {
        const user = await User.findOne({ email: req.body.email })
        console.log(req.body)
        const id = uuid();
        const email = req.body.email
        const tokenrequest = new Token({
            id,
            email
        })
        console.log(tokenrequest)
        const newtoken = await tokenrequest.save();
        console.log("h3")
        let output = `
            <h1>Hey ! ${user.name}</h1>
            We received a request for change of password for your account.
            Kindly click on the link provided below to change your password.
            Link : http://localhost:3000/reset/${tokenrequest.id} `

        await sendMail(tokenrequest.email, output)
        console.log("h4")
        res.status(200).send({ message: "Mail sent to user " })
    } catch (error) {
        return res.status(404).send({ message: "Server Error" })
    }
}


//function that allows a user to reset a password
const resetPassword = async (req, res) => {
    try {
        const reqid = req.params.id;
        const token = await Token.findOne({ id: reqid })
        const reqemail = token.email
        const user = await User.findOne({ email: reqemail })
        const hashpassword = await bcrypt.hash(req.body.password, 3)
        const newpass = await User.updateOne({ email: user.email }, { password: hashpassword })
        res.status(200).send({ message: "Password Reset Successfully !" })

    } catch (error) {
        return res.status(404).send({ message: "Server Error" })
    }
}


module.exports = { registerUser, loginUser, resetPassword, forgotPassword }