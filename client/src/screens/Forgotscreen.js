import React, { useState } from 'react'
import axios from "axios"
import Error from '../components/Error';
import Loader from '../components/Loader';
import AOS from 'aos'
import 'aos/dist/aos.css'
import Swal from "sweetalert2"

const Forgotscreen = () => {

    const [email, setemail] = useState('');

    const [loading, setloading] = useState(false);
    const [error, seterror] = useState();

    const forgot = async () => {
        try {
            setloading(true)
            const user = {
                email: email
            }
            const result = (await axios.post("/api/users/forgot", user)).data
            setloading(false)
            console.log(result)
            Swal.fire('Congratulations', `${result.message}`)

        } catch (error) {
            console.log(error)
            setloading(false)
            seterror(true)
        }
    }
    return (
        <div>
            {loading && (<Loader />)}
            <div className='row justify-content-center mt-5  mx-3' data-aos="fade-in">
                <div className='col-md-5 bs4 mt-5' style={{ backgroundColor: "white" }}>
                    {error && (<Error message="User not found " />)}
                    <div>
                        <h2 className='text-center' style={{ fontWeight: "bolder" }}>Forgot Password</h2>
                        <input className='form-control ' type="email" placeholder='Email' value={email} onChange={(e) => { setemail(e.target.value) }} />
                        <button className='btn btn-dark mt-3' style={{ float: "right" }} onClick={forgot}>Next</button>

                    </div>
                </div>
            </div>
        </div>
    )
}

export default Forgotscreen