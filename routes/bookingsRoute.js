const express = require('express');
const { BookRoom, getBookingById, CancelBooking, getBookings } = require('../controllers/bookings');
const router = express.Router();

//Bookings Route 
//Allows a user to book a room 
//@public route
router.post("/bookroom", BookRoom)


//Bookings Route 
//Allows a user to get a room booking 
//@public route
router.post("/getbookingsbyuserid", getBookingById)


//Bookings Route 
//Allows a user to cancel a booking 
//@public route
router.post("/cancelbooking", CancelBooking)


//Bookings Route 
//Allows a user to get all bookings 
//@public route
router.get("/getallbookings", getBookings)


module.exports = router