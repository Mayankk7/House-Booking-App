import React, { useState, useEffect } from 'react'
import axios from "axios"
import Loader from '../components/Loader'
import Error from '../components/Error'
import moment from 'moment'
import StripeCheckout from 'react-stripe-checkout';
import Swal from "sweetalert2"
import AOS from 'aos'
import 'aos/dist/aos.css'

AOS.init(
    {
        duration:1000
    }
);

const Bookingscreen = ({ match }) => {

    const [room, setroom] = useState()
    const [loading, setloading] = useState(true)
    const [error, seterror] = useState()

    const roomid = match.params.roomid
    const fromdate = moment(match.params.fromdate, "DD-MM-YYYY")
    const todate = moment(match.params.todate, "DD-MM-YYYY")

    const totaldays = moment.duration(todate.diff(fromdate)).asDays() + 1;
    const [totalamount, settotalamount] = useState();

    useEffect(async () => {

        if(!localStorage.getItem('currentUser')){
            window.location.href='/login'
        }

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

    const onToken = async(token) => {
        console.log(token)
        const bookingDetails = {

            room,
            userid: JSON.parse(localStorage.getItem('currentUser'))._id,
            fromdate,
            todate,
            totalamount,
            totaldays,
            token

        }

        try {
            setloading(true)
            const result = await axios.post('/api/bookings/bookroom', bookingDetails)
            setloading(false)
            Swal.fire("Congratulations","Your Room Booked Successfully","success").then(result =>{
                window.location.href="/profile"
            })

        } catch (error) {
            setloading(false)
            console.log(error)
            Swal.fire("OOPS", "Something went wrong","error")

        }
      }

    return (
        <div className='m-5' data-aos="flip-left">

            {loading ? <h1><Loader /></h1> : room ? (

                <div className='row justify-content-center mt-5 bs' style={{backgroundColor:"white"}}>
                    <div className='col-md-5'>
                        <h1 className='text-center'><b>{room.name}</b></h1>
                        <img src={room.imageurls[0]} className='big-img' />
                    </div>

                    <div className='col-md-5 mt-2'>
                        <div style={{ textAlign: "center" }}>
                            <h1><b>Booking Details</b></h1>
                            <hr />

                                <p><b>Name : </b>{JSON.parse(localStorage.getItem('currentUser')).name}</p>
                                <p><b>From Date :</b> {match.params.fromdate}</p>
                                <p><b>To Date : </b>{match.params.todate}</p>
                                <p><b>Max Count : </b>{room.maxcount}</p>

                        </div>

                        <div className="p-2" style={{ textAlign: "center" }}>
                            <h1><b>AMOUNT</b></h1>
                            <hr />
                                <p><b>Total Days :</b> {totaldays}</p>
                                <p><b>Rent per Day :</b> {room.rentperday}</p>
                                <p><b>Total Amount :</b> {totalamount}</p>
                        </div>

                        <div style={{ float: "right" }}>
                            
                            <StripeCheckout
                                token={onToken}
                                currency='INR'
                                amount={totalamount * 100}
                                stripeKey="pk_test_51KIT1CSCLQbR5TPEYSMp1ZhlJ5oTbV6ztzzCZ4AJU9Mt1EGO3oafVtu6Iahxg26ylt4KLe7kZZ7ySdrhn8WuLKgg00YPZzfPv3"
                            >
                                <button className='btn btn-dark'>Pay Now</button>
                            </StripeCheckout>
                        </div>
                    </div>
                </div>
            ) : (<Error />)}

        </div>
    )
}

export default Bookingscreen
