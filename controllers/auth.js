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
        <table cellspacing="0" border="0" cellpadding="0" width="100%" bgcolor="#f2f3f8"
        style="@import url(https://fonts.googleapis.com/css?family=Rubik:300,400,500,700|Open+Sans:300,400,600,700); font-family: 'Open Sans', sans-serif;">
        <tr>
            <td>
                <table style="background-color: #f2f3f8; max-width:670px; margin:0 auto;" width="100%" border="0"
                    align="center" cellpadding="0" cellspacing="0">
                    <tr>
                        <td style="height:80px;">&nbsp;</td>
                    </tr>
                    <tr>
                        <td style="text-align:center;">
                            <a href="https://roomzappy.herokuapp.com/" title="logo" target="_blank">
                            <img width="60" src="https://img.icons8.com/color-glass/48/000000/r.png" title="logo" alt="logo">
                          </a>
                        </td>
                    </tr>
                    <tr>
                        <td style="height:20px;">&nbsp;</td>
                    </tr>
                    <tr>
                        <td>
                            <table width="95%" border="0" align="center" cellpadding="0" cellspacing="0"
                                style="max-width:670px; background:#fff; border-radius:3px; text-align:center;-webkit-box-shadow:0 6px 18px 0 rgba(0,0,0,.06);-moz-box-shadow:0 6px 18px 0 rgba(0,0,0,.06);box-shadow:0 6px 18px 0 rgba(0,0,0,.06);">
                                <tr>
                                    <td style="height:40px;">&nbsp;</td>
                                </tr>
                                <tr>
                                    <td style="padding:0 35px;">
                                        <h1 style="color:#1e1e2d; font-weight:500; margin:0;font-size:32px;font-family:'Rubik',sans-serif;">Get started
                                        </h1>
                                        <p style="font-size:15px; color:#455056; margin:8px 0 0; line-height:24px;">
                                            Your account has been created on the RoomsZappy application. This application allows you to book a room for any number of days you want. <br>
                                        

                                        <a href="https://roomzappy.herokuapp.com/login"
                                            style="background:#414a4c;text-decoration:none !important; display:inline-block; font-weight:500; margin-top:24px; color:#fff;text-transform:uppercase; font-size:14px;padding:10px 24px;display:inline-block;border-radius:50px;">Login
                                            to your Account</a>
                                    </td>
                                </tr>
                                <tr>
                                    <td style="height:40px;">&nbsp;</td>
                                </tr>
                            </table>
                        </td>
                    </tr>
                    <tr>
                        <td style="height:20px;">&nbsp;</td>
                    </tr>
                    <tr>
                    </tr>
                    <tr>
                        <td style="height:80px;">&nbsp;</td>
                    </tr>
                </table>
            </td>
        </tr>
    </table>
        `
        let subject = "Account Created"
        sendMail(newuser.email, output, subject)

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
        <table cellspacing="0" border="0" cellpadding="0" width="100%" bgcolor="#f2f3f8"
        style="@import url(https://fonts.googleapis.com/css?family=Rubik:300,400,500,700|Open+Sans:300,400,600,700); font-family: 'Open Sans', sans-serif;">
        <tr>
            <td>
                <table style="background-color: #f2f3f8; max-width:670px;  margin:0 auto;" width="100%" border="0"
                    align="center" cellpadding="0" cellspacing="0">
                    <tr>
                        <td style="height:80px;">&nbsp;</td>
                    </tr>
                    <tr>
                        <td style="text-align:center;">
                          <a href="https://roomzappy.herokuapp.com/" title="logo" target="_blank">
                            <img width="60" src="https://img.icons8.com/color-glass/48/000000/r.png" title="logo" alt="logo">
                          </a>
                        </td>
                    </tr>
                    <tr>
                        <td style="height:20px;">&nbsp;</td>
                    </tr>
                    <tr>
                        <td>
                            <table width="95%" border="0" align="center" cellpadding="0" cellspacing="0"
                                style="max-width:670px;background:#fff; border-radius:3px; text-align:center;-webkit-box-shadow:0 6px 18px 0 rgba(0,0,0,.06);-moz-box-shadow:0 6px 18px 0 rgba(0,0,0,.06);box-shadow:0 6px 18px 0 rgba(0,0,0,.06);">
                                <tr>
                                    <td style="height:40px;">&nbsp;</td>
                                </tr>
                                <tr>
                                    <td style="padding:0 35px;">
                                        <h1 style="color:#1e1e2d; font-weight:500; margin:0;font-size:32px;font-family:'Rubik',sans-serif;">You have
                                            requested to reset your password</h1>
                                        <span
                                            style="display:inline-block; vertical-align:middle; margin:29px 0 26px; border-bottom:1px solid #cecece; width:100px;"></span>
                                        <p style="color:#455056; font-size:15px;line-height:24px; margin:0;">
                                            We cannot simply send you your old password. A unique link to reset your
                                            password has been generated for you. To reset your password, click the
                                            following link and follow the instructions.
                                        </p>
                                        <a href="https://roomzappy.herokuapp.com/reset/${tokenrequest.id}"
                                            style="background:#414a4c;text-decoration:none !important; font-weight:500; margin-top:35px; color:#fff;text-transform:uppercase; font-size:14px;padding:10px 24px;display:inline-block;border-radius:50px;">Reset
                                            Password</a>
                                    </td>
                                </tr>
                                <tr>
                                    <td style="height:40px;">&nbsp;</td>
                                </tr>
                            </table>
                        </td>
                    <tr>
                        <td style="height:20px;">&nbsp;</td>
                    </tr>
                    
                    <tr>
                            <td style="height:80px;">&nbsp;</td>
                        </tr>
                    </table>
                </td>
            </tr>
        </table> `

        let subject = "Password Reset Request"
        await sendMail(tokenrequest.email, output, subject)
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