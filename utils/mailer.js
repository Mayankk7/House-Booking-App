const nodemailer = require("nodemailer")


//function that sends mail to the user 
const sendMail = async (email, output, subject) => {
    var pas = "nananani"
    let transporter = nodemailer.createTransport({
        service: "gmail",
        host: "smtp.gmail.com",
        port: 587,
        secure: false,
        auth: {
            user: 'mayank26032@gmail.com',
            pass: pas
        },
        tls: {
            rejectUnauthorized: false
        }
    })


    let info = await transporter.sendMail({
        from: '"RoomsZappy" mayank26032@gmail.com ', // sender address
        to: email, // list of receivers
        subject: subject, // Subject line
        text: "Welcome to RoomZappy", // plain text body
        html: output, // html body
    });

    console.log("Message sent: %s", info.messageId);

}

module.exports = sendMail