import React, { useState, useEffect } from 'react'
import axios from "axios"
import { Tabs } from 'antd';
import Loader from '../components/Loader';
import Error from "../components/Error";
import Swal from "sweetalert2"

const { TabPane } = Tabs;

const Adminscreen = () => {

    useEffect(()=>{

        const user = JSON.parse(localStorage.getItem("currentUser"))
        console.log(user.isAdmin)
        if(!user.isAdmin){
            window.location.href="/home"
        }
    },[])


    return (
        <div className='m-5 bs ' style={{backgroundColor:"white"}}>
            <h2 className='text-center' style={{ fontSize: '30px' }}><b>Admin Panel</b></h2>
            <Tabs defaultActiveKey="1">
                <TabPane tab="Bookings" key="1">
                    <Bookings />
                </TabPane>
                <TabPane tab="Rooms" key="2">
                    <Rooms/>
                </TabPane>
                <TabPane tab="Add Rooms" key="3">
                    <Addroom/>
                </TabPane>
                <TabPane tab="Users" key="4">
                    <Users/>
                </TabPane>
            </Tabs>
        </div>
    )
}

export default Adminscreen


export function Bookings() {

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

            <div className='col-md-10'>
                <h1 className='text-center'>BOOKINGS</h1>
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

export function Rooms() {

    const [rooms, setrooms] = useState();
    const [loading, setloading] = useState(false)
    const [error, seterror] = useState()
    const [change,setchange] = useState(false)

    useEffect(async () => {

        try {
            setloading(true)
            const response = (await axios.get("/api/rooms/getallrooms")).data
            setrooms(response)
            setloading(false)
            setchange(false)
            console.log(response)

        } catch (error) {
            setloading(false)
            seterror(false)
            console.log(error)
        }


    }, [change])

    const deleteRoom = async(roomid) =>{

        
        try {
            const id = roomid;
            await axios.delete(`/api/rooms/deleteroom/${id}`).then(
                res => {console.log(res)}
            )
            Swal.fire("Congrats","Room has been deleted Successfully", "success").then(
                result=>{
                    setchange(true);
                }
            )
            console.log("Room Deleted")

        } catch (error) {
            console.log(error) 
            Swal.fire("OOPS","Something went wrong!","error")   
        }
    }

    return (
        <div className='row justify-content-center'>

            <div className='col-md-10'>
                <h1 className='text-center'>ROOMS</h1>
                {loading && (<Loader />)}

                <table className='table table-bordered table-dark'>
                    <thead className='bs'>
                        <tr>
                            <th>RoomID</th>
                            <th>Name</th>
                            <th>Type</th>
                            <th>Rent Per Day</th>
                            <th>Max Count</th>
                            <th>Phone Number</th>
                            <th>Delete</th>
                        </tr>
                    </thead>

                    <tbody>
                        {rooms && (
                            rooms.map(room => {
                                return <tr>
                                    <td>{room._id}</td>
                                    <td>{room.name}</td>
                                    <td>{room.type}</td>
                                    <td>{room.rentperday}</td>
                                    <td>{room.maxcount}</td>
                                    <td>{room.phonenumber}</td>
                                    <td><button className='btn btn-dark' onClick={()=>{deleteRoom(room._id)}}><i class="fas fa-trash-alt"></i></button></td>
                                </tr>
                            })
                        )}
                    </tbody>
                </table>



            </div>

        </div>
    )
}

export function Users() {

    const [users, setusers] = useState();
    const [loading, setloading] = useState(false)
    const [error, seterror] = useState()

    useEffect(async () => {

        try {
            setloading(true)
            const response = (await axios.get("/api/users/getallusers")).data
            setusers(response)
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

            <div className='col-md-10'>
                <h1 className='text-center'>USERS</h1>
                {loading && (<Loader />)}

                <table className='table table-bordered table-dark'>
                    <thead className='bs'>
                        <tr>
                            <th>UserId</th>
                            <th>Name</th>
                            <th>Email</th>
                            <th>IsAdmin</th>
                        </tr>
                    </thead>

                    <tbody>
                        {users && (
                            users.map(user => {
                                return <tr>
                                    <td>{user._id}</td>
                                    <td>{user.name}</td>
                                    <td>{user.email}</td>
                                    <td>{user.isAdmin ? 'YES' : 'NO'}</td>
                                </tr>
                            })
                        )}
                    </tbody>
                </table>



            </div>

        </div>
    )
}


export function Addroom(){

    const [loading,setloading] = useState(false);
    const [error,seterror] = useState()

    const [name,setname] = useState('');
    const [rentperday,setrentperday] = useState();
    const [maxcount,setmaxcount] = useState()
    const [description,setdescription] = useState('');
    const [phonenumber,setphonenumber] = useState()
    const [type,settype] = useState()
    const [imageurl1,setimageurl1] = useState()
    const [imageurl2,setimageurl2] = useState()
    const [imageurl3,setimageurl3] = useState()


    const addRoom = async() => {

        const newroom = {
            name,
            rentperday,
            maxcount,
            description,
            phonenumber,
            type,
            imageurls:[
                imageurl1,
                imageurl2,
                imageurl3
            ]
        }

        try{

            setloading(true)
            const result = (await axios.post('/api/rooms/addroom', newroom)).data
            console.log(result)
            setloading(false)    
            Swal.fire('Congrats','Your Room has been Added' , 'success')

        }catch(error){
            console.log(error)
            setloading(false)
            seterror(true)
            Swal.fire('OOPS','Something went wrong','error')
        }

    } 

    return (
        <div className='row justify-content-center m-5'>

            <div className='col-md-5'>
                {loading && <Loader/>}
                <input className='form-control' text="text" placeholder='Room Name'
                    value={name} onChange={(e)=>{setname(e.target.value)}}
                />
                <input className='form-control' text="text" placeholder='Rent Per Day'
                    value={rentperday} onChange={(e)=>{setrentperday(e.target.value)}}
                />
                <input className='form-control' text="text" placeholder='Max Count'
                    value={maxcount} onChange={(e)=>{setmaxcount(e.target.value)}}
                />
                <input className='form-control' text="text" placeholder='Description'
                    value={description} onChange={(e)=>{setdescription(e.target.value)}}
                />
                <input className='form-control' text="text" placeholder='Phone Number'
                    value={phonenumber} onChange={(e)=>{setphonenumber(e.target.value)}}
                />
            </div>
            <div className='col-md-5'>
                <input className='form-control' text="text" placeholder='Type'
                    value={type} onChange={(e)=>{settype(e.target.value)}}
                />
                <input className='form-control' text="text" placeholder='Image URL 1'
                    value={imageurl1} onChange={(e)=>{setimageurl1(e.target.value)}}
                />
                <input className='form-control' text="text" placeholder='Image URL 2'
                    value={imageurl2} onChange={(e)=>{setimageurl2(e.target.value)}}
                />
                <input className='form-control' text="text" placeholder='Image URL 3'
                    value={imageurl3} onChange={(e)=>{setimageurl3(e.target.value)}}
                />
            
            </div>
            <div className='text-center mt-4'>
                    <button className='btn btn-dark' onClick={addRoom}>Add Room</button>
            </div>
        </div>
    )

}