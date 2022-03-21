import React, { useState, useEffect } from 'react'
import { Tabs } from 'antd';
import axios from 'axios';
import Loader from '../components/Loader'
import Swal from "sweetalert2"
import { Tag, Divider } from 'antd';
import { MDBInput } from "mdbreact";

const { TabPane } = Tabs;

const ProfileScreen = () => {

    const user = JSON.parse(localStorage.getItem('currentUser'));


    useEffect(() => {
        if (!user) {
            window.location.href = "/login"
        }
    }, [])

    return (
        <div className='' style={{ color: "white" }}>
            <Tabs defaultActiveKey="1" size={"large"} style={{ color: "white", height: "70vh" }} tabPosition="top" className='tabshead'>
                <TabPane tab="Profile" key="1" style={{ color: "black" }}>
                    <div className='bs tabs' >
                        <b><h1 style={{ fontWeight: "bolder", padding: "2vh" }}>MY PROFILE</h1></b>
                        <br />
                        <div className='profile'>
                            <div>
                                <div style={{ width: "40vh", padding: "2vh" }}>
                                    <label>Name</label>
                                    <input type="name" defaultValue={user.name} disabled />
                                </div>
                                <div style={{ width: "40vh", padding: "2vh" }}>
                                    <label>Email</label>
                                    <input type="name" defaultValue={user.email} disabled />
                                </div>
                            </div>
                            <div>
                                <img src={"https://ui-avatars.com/api/?rounded=true&name=" + user.name}
                                    style={{ width: "15vw", marginLeft: "15vh" }} />
                            </div>
                        </div>


                    </div>
                </TabPane>
                <TabPane tab="Bookings" key="2">
                    <MyBookings />
                </TabPane>
            </Tabs>
        </div >
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
            <div className='flex flex-row' >
                <div className='bookingtab'>
                    {loading && <Loader />}
                    {bookings && (bookings.map(booking => {

                        return (
                            <div className='bs mx-3 mb-5' style={{ backgroundColor: "white" }}>
                                <p><b>{booking.room}</b></p>
                                <p><b>BookingID</b> : {booking._id}</p>
                                <p><b>CheckIn :</b> {booking.fromdate}</p>
                                <p><b>CheckOut : </b>{booking.todate}</p>
                                <p><b>Amount :</b> {booking.totalamount}</p>
                                <p><b>Status : </b>{booking.status == 'cancelled' ? (<Tag color="red">CANCELLED</Tag>) :
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
