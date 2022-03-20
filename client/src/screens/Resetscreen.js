import React, { useState } from 'react'
import axios from "axios"
import Success from '../components/Success';
import Error from '../components/Error';
import Loader from "../components/Loader"
import Swal from "sweetalert2"
import AOS from 'aos'
import 'aos/dist/aos.css'


AOS.init(
    {
        duration: 1000
    }
);

const Resetscreen = ({ match }) => {

    const [password, setpassword] = useState('');
    const [cpassword, setcpassword] = useState('');

    const [loading, setloading] = useState(false);
    const [error, seterror] = useState();
    const [success, setsuccess] = useState();
    const id = match.params.id

    const reset = async () => {
        console.log(id)
        setloading(true)
        if (password == cpassword) {
            const user = {
                password: password
            }
            try {
                const result = (await axios.patch(`/api/users/reset/${id}`, user)).data
                setloading(false)
                console.log(result)
                Swal.fire("Congrats!", "Your password has been changes successfully", "success")
            } catch (error) {
                setloading(false)
                seterror(true)
            }
        } else {
            setloading(false)
            Swal.fire("Password Doesn't Match", "question")
        }
    }
    return (
        <div>
            {loading && <Loader />}

            <div className='row justify-content-center mt-5  m-3' data-aos="fade-in">
                <div className='col-md-5 bs4 mt-5 ' style={{ backgroundColor: "white" }}>
                    {success && <Success message="Reset Successful" />}
                    {error && <Error />}
                    <div>
                        <h2 className='text-center' style={{ fontWeight: "bolder" }}>Reset Password</h2>
                        <input className='form-control ' type="password" placeholder='Password' value={password} onChange={(e) => { setpassword(e.target.value) }} />
                        <input className='form-control ' type="password" placeholder='Confirm Password' value={cpassword} onChange={(e) => { setcpassword(e.target.value) }} />

                        <button className='btn btn-dark mt-3' style={{ float: "right" }} onClick={reset}>Reset</button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Resetscreen