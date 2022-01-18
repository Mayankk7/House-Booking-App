import React, {useState,useEffect} from 'react'
import Loader from '../Loader';
import axios from 'axios';

const Bookings = () => {
    const [bookings, setbookings] = useState();
    const [loading, setloading] = useState(false)
    const [error, seterror] = useState()

    useEffect(async () => {

        try {
            setloading(true)
            const response = (await axios.get("/api/bookings/getallbookings")).data
            setbookings(response)
            setloading(false)
            console.log(response)

        } catch (error) {
            setloading(false)
            seterror(false)
            console.log(error)
        }


    }, [])


    return (
        <div className='row justify-content-center'>

            <div className='col-md-10' style={{overflow:"auto"}}>
                <h1 className='text-center'><b>BOOKINGS</b></h1>
                {loading && (<Loader />)}

                <table className='table table-bordered table-dark'>
                    <thead className='bs'>
                        <tr>
                            <th>BookingID</th>
                            <th>UserID</th>
                            <th>Room</th>
                            <th>From</th>
                            <th>To</th>
                            <th>Status</th>
                        </tr>
                    </thead>

                    <tbody>
                        {bookings && (
                            bookings.map(booking => {
                                return <tr>
                                    <td>{booking._id}</td>
                                    <td>{booking.userid}</td>
                                    <td>{booking.room}</td>
                                    <td>{booking.fromdate}</td>
                                    <td>{booking.todate}</td>
                                    <td>{booking.status}</td>
                                </tr>
                            })
                        )}
                    </tbody>
                </table>



            </div>

        </div>
    )
}

export default Bookings
