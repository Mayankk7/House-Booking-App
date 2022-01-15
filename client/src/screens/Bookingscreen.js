import React, { useState, useEffect } from 'react'
import axios from "axios"
import Loader from '../components/Loader'
import Error from '../components/Error'

const Bookingscreen = ({ match }) => {

    const [room, setroom] = useState()
    const [loading, setloading] = useState(true)
    const [error, seterror] = useState()

    useEffect(async () => {
        try {

            setloading(true)

            const response = (await axios.post("/api/rooms/getroombyid", { roomid: match.params.roomid })).data
            setroom(response)

            setloading(false);
        } catch (error) {
            setloading(false)
            seterror(true);

        }
    }, [])
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
                                <p>Name : </p>
                                <p>From Date : </p>
                                <p>To Date : </p>
                                <p>Max Count : {room.maxcount}</p>

                            </b>
                        </div>

                        <div style={{ textAlign: "right" }}>
                            <h1>Amount : </h1>
                            <hr />
                            <b><p>Total Days : </p>
                                <p>Rent per Day : {room.rentperday}</p>
                                <p>Total Amount : </p></b>
                        </div>

                        <div style={{ float: "right" }}>
                            <button className='btn btn-dark'>Pay Now</button>
                        </div>
                    </div>
                </div>
            ) : (<Error />)}

        </div>
    )
}

export default Bookingscreen
