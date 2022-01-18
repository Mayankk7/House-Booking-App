import React, {useState,useEffect} from 'react'
import Loader from '../Loader';
import axios from 'axios';

const Users = () => {
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

            <div className='col-md-10' style={{overflow:"auto"}}>
                <h1 className='text-center'><b>USERS</b></h1>
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

export default Users
