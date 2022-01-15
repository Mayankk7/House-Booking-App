const express = require("express");

const app = express();
const dbCOnfig = require("./db")
const roomsRoute = require("./routes/roomsRoute")

app.use(express.json());

app.use("/api/rooms", roomsRoute);

const port = process.env.PORT || 5000;

app.listen(port, ()=>{
    console.log(`Server started at port ${port}`);
})