import React, { useState, useEffect } from 'react'
import { Tabs } from 'antd';
import axios from 'axios';
import Loader from '../components/Loader'
import Swal from "sweetalert2"
import { Tag, Divider } from 'antd';

const { TabPane } = Tabs;





const ProfileScreen = () => {

    const user = JSON.parse(localStorage.getItem('currentUser'));


    useEffect(() => {
        if (!user) {
            window.location.href = "/login"
        }
    }, [])

    return (
        <div className='m-5' >
            <Tabs defaultActiveKey="1">
                <TabPane tab="Profile" key="1">
                    <div className='bs' style={{backgroundColor:"white"}}>
                    <b><h1 style={{fontWeight:"bolder"}}>MY PROFILE</h1></b>
                    <br />
                    <h1><b>Name :</b> {user.name}</h1>
                    <h1><b>Email :</b> {user.email}</h1>
                    <h1><b>IsAdmin :</b> {user.isAdmin ? 'YES' : 'NO'}</h1>
                    </div>
                </TabPane>
                <TabPane tab="Bookings" key="2">
                    <MyBookings />
                </TabPane>
            </Tabs>
        </div>
    )
}

export default ProfileScreen


export function MyBookings() {

    const user = JSON.parse(localStorage.getItem('currentUser'));
    const [bookings, setbookings] = useState([]);

    const [loading, setloading] = useState(false)
    const [error, seterror] = useState()

    useEffect(async () => {

        try {
            setloading(true)
            const rooms = await (
                await axios.post('/api/bookings/getbookingsbyuserid', { userid: user._id })
            ).data
            setloading(false)
            setbookings(rooms);

        } catch (error) {
            setloading(false)
            console.log(error)
            seterror(true)
        }

    }, []);

    const cancelBooking = async (bookingid, roomid) => {

        try {
            setloading(true)
            const result = await (await axios.post('/api/bookings/cancelbooking', { bookingid, roomid })).data
            setloading(false)
            console.log(result)
            Swal.fire('Congrats', 'Your Booking has been cancelled', 'success').then(result => {
                window.location.reload();
            })
        } catch (error) {
            console.log(error)
            setloading(false)
            Swal.fire('OOPS', 'Something went wrong', 'error')
        }

    }

    return (
        <div>
            <div className='row' >
                <div className='col-md-6' style={{display:'flex', flexWrap:"wrap"}}>
                    {loading && <Loader />}
                    {bookings && (bookings.map(booking => {

                        return (
                            <div className='bs mx-3' style={{backgroundColor:"white"}}>
                                <p><b>{booking.room}</b></p>
                                <p><b>BookingID</b> : {booking._id}</p>
                                <p><b>CheckIn :</b> {booking.fromdate}</p>
                                <p><b>CheckOut : </b>{booking.todate}</p>
                                <p><b>Amount :</b> {booking.totalamount}</p>
                                <p><b>Status : </b>{booking.status=='cancelled' ? (<Tag color="red">CANCELLED</Tag>) : 
                                (<Tag color="green">CONFIRMED</Tag>)}</p>

                                {booking.status !== 'cancelled' && <div className='ml-auto'>
                                    <button className='btn btn-dark' onClick={() => { cancelBooking(booking._id, booking.roomid) }}>Cancel Booking</button>
                                </div>}
                            </div>
                        )

                    }))}
                </div>
            </div>

        </div>
    )
}
