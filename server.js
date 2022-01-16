const express = require("express");

const app = express();

const dbCOnfig = require("./db")

const roomsRoute = require("./routes/roomsRoute")
const usersRoute = require("./routes/userRoute")
const bookingRoute = require("./routes/bookingsRoute")

app.use(express.json());

app.use("/api/rooms", roomsRoute);
app.use("/api/users", usersRoute);
app.use("/api/bookings",bookingRoute)

const port = process.env.PORT || 5000;


if ( process.env.NODE_ENV == "production" ){
    app.use(express.static("client/build"));

    app.get('*', (request, response) => {
        response.sendFile(path.join(__dirname, 'client/build', 'index.html'));
    });
}


app.listen(port, ()=>{
    console.log(`Server started at port ${port}`);
})