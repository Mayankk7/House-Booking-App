const express = require("express");

const app = express();

const dbCOnfig = require("./db")
const cors = require("cors")
const path = require('path')

const roomsRoute = require("./routes/roomsRoute")
const usersRoute = require("./routes/userRoute")
const bookingRoute = require("./routes/bookingsRoute");

app.use(express.urlencoded({extended: false}));
app.use(express.json());
app.use(cors({origin:true}))

app.use("/api/rooms", roomsRoute);
app.use("/api/users", usersRoute);
app.use("/api/bookings",bookingRoute)

const port = process.env.PORT || 5000;


    app.use(express.static(path.join(__dirname, "client/build")));

    app.get('*', (request, response) => {
        response.sendFile(path.join(__dirname, 'client/build', 'index.html'));
    });


app.listen(port, ()=>{
    console.log(`Server started at port ${port}`);
})