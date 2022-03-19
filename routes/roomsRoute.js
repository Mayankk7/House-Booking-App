const express = require("express")
const router = express.Router();

const { getRooms, getRoombyId, AddRoom, DeleteRoom } = require("../controllers/rooms")


//Rooms Route 
//provides all the rooms present in the database 
//@public route 
router.get("/getallrooms", getRooms)

//Rooms Route
//provides details of room with particular id from database
//@public route
router.post("/getroombyid", getRoombyId)


//Rooms Route 
//allows admin to add a new room into database 
//@protected route only for admins 
router.post("/addroom", AddRoom)

//Rooms Route 
//allows admin to delete a room from database
//@protected route only for admin 
router.delete("/deleteroom/:id", DeleteRoom)


module.exports = router;