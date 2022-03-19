const Room = require("../models/room")


//function to get all rooms details from database
const getRooms = async (req, res) => {

    try {
        const rooms = await Room.find({});
        return res.json(rooms);

    } catch (error) {
        return res.status(400).json({ message: error })
    }
}

//function to get a particular room details from database
const getRoombyId = async (req, res) => {

    const roomid = req.body.roomid;

    try {
        const room = await Room.findOne({ _id: roomid });
        return res.json(room);

    } catch (error) {
        return res.status(400).json({ message: error })
    }
}


//function to add a new room to database 
const AddRoom = async (req, res) => {

    try {
        const newroom = new Room(req.body)
        await newroom.save();

        res.send("New Room Added Successfully")

    } catch (error) {
        return res.status(400).json({ error })
    }
}


//function to delete a room from database 
const DeleteRoom = async (req, res) => {

    try {
        const roomid = req.params.id
        console.log(roomid)
        await Room.findByIdAndDelete({ _id: roomid });
        res.send("Room Deleted Successfully");
    } catch (error) {
        return res.status(404).json({ error })
    }

}

module.exports = { getRooms, getRoombyId, AddRoom, DeleteRoom }