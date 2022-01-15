import React, { useState, useEffect } from 'react'
import axios from "axios"
import Loader from '../components/Loader'
import Error from '../components/Error'
import moment from 'moment'

const Bookingscreen = ({ match }) => {

    const [room, setroom] = useState()
    const [loading, setloading] = useState(true)
    const [error, seterror] = useState()

    const roomid = match.params.roomid
    const fromdate = moment(match.params.fromdate, "DD-MM-YYYY")
    const todate = moment(match.params.todate, "DD-MM-YYYY")

    const totaldays = moment.duration(todate.diff(fromdate)).asDays() + 1;
    const [totalamount,settotalamount] = useState();

    useEffect(async () => {
        try {

            setloading(true)

            const response = (await axios.post("/api/rooms/getroombyid", { roomid: match.params.roomid })).data
            setroom(response)
            settotalamount(response.rentperday * totaldays)
            setloading(false);
        } catch (error) {
            setloading(false)
            seterror(true);

        }
    }, [])

    const bookRoom = async() => {
        
        const bookingDetails = {

            room,
            userid:JSON.parse(localStorage.getItem('currentUser'))._id,
            fromdate,
            todate,
            totalamount,
            totaldays

        }

        try {
            const result = await axios.post('/api/bookings/bookroom',bookingDetails)
        } catch (error) {
            console.log(error)
        }
    }
    return (
        <div className='m-5'>

            {loading ? <h1><Loader /></h1> : room ? (

                <div className='row justify-content-center mt-5 bs'>
                    <div className='col-md-7'>
                        <h1>{room.name}</h1>
                        <img src={room.imageurls[0]} className='bigimg m-2' />
                    </div>

                    <div className='col-md-5'>
                        <div style={{ textAlign: "right" }}>
                            <h1>Booking Details</h1>
                            <hr />
                            <b>
                                <p>Name : {JSON.parse(localStorage.getItem('currentUser')).name}</p>
                                <p>From Date : {match.params.fromdate}</p>
                                <p>To Date : {match.params.todate}</p>
                                <p>Max Count : {room.maxcount}</p>

                            </b>
                        </div>

                        <div style={{ textAlign: "right" }}>
                            <h1>Amount</h1>
                            <hr />
                            <b><p>Total Days : {totaldays}</p>
                                <p>Rent per Day : {room.rentperday}</p>
                                <p>Total Amount : {totalamount}</p></b>
                        </div>

                        <div style={{ float: "right" }}>
                            <button className='btn btn-dark' onClick={bookRoom}>Pay Now</button>
                        </div>
                    </div>
                </div>
            ) : (<Error />)}

        </div>
    )
}

export default Bookingscreen
