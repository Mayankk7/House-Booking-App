const express = require("express")
const router = express.Router();
const { getUsers } = require("../controllers/user");
const { registerUser, loginUser } = require("../controllers/auth")


//Auth Route
//route to allows a user to register
//@public route /register
router.post("/register", registerUser)

//User Route
//route to login a user using email and password 
//@protected route validates only registered user
router.post("/login", loginUser)

//User Route 
//route to get all users on home screen 
//@public route /getallusers
router.get('/getallusers', getUsers)

module.exports = router;