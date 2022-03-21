import React, { useState, useEffect } from 'react'
import Loader from '../Loader';
import axios from 'axios';
import Swal from 'sweetalert2';

const Users = () => {
    const [users, setusers] = useState();
    const [loading, setloading] = useState(false)
    const [error, seterror] = useState()
    const [change, setchange] = useState(false)

    useEffect(async () => {

        try {
            setloading(true)
            const response = (await axios.get("/api/users/getallusers")).data
            setusers(response)
            setloading(false)
            setchange(false)
            console.log(response)

        } catch (error) {
            setloading(false)
            seterror(false)
            console.log(error)
        }


    }, [change])

    const deleteUser = async (roomid) => {
        try {
            const id = roomid;
            console.log(id)
            await axios.delete(`/api/users/deleteuser/${id}`).then(
                res => { console.log(res) }
            )
            Swal.fire("Congrats", "User has been deleted Successfully", "success").then(
                result => {
                    setchange(true);
                }
            )
            console.log("User Deleted")
        } catch (error) {
            console.log(error)
            Swal.fire("OOPS", "Something went wrong!", "error")
        }
    }

    return (
        <div className='row justify-content-center'>

            <div className='col-md-10' style={{ overflow: "auto" }}>
                <h1 className='text-center'><b>USERS</b></h1>
                {loading && (<Loader />)}

                <table className='table table-bordered table-dark'>
                    <thead className='bs'>
                        <tr>
                            <th>UserId</th>
                            <th>Name</th>
                            <th>Email</th>
                            <th>Admin</th>
                            <th>Delete</th>
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
                                    <td><button className='btn btn-darkbtn btn-dark' onClick={() => { deleteUser(user._id) }}><i class="fas fa-trash-alt"></i></button></td>
                                </tr>
                            })
                        )}
                    </tbody>
                </table>



            </div>

        </div>
    )
}

export default Users
