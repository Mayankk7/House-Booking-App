import React, {useEffect,useState} from 'react'
import axios from 'axios';
import Loader from '../Loader';
import Swal from 'sweetalert2';

const Rooms = () => {
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

            <div className='col-md-10' style={{overflow:"auto"}}>
                <h1 className='text-center'><b>ROOMS</b></h1>
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

export default Rooms
