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
        duration:1000
    }
);

const Registerscreen = () => {

    const [name, setname] = useState('');
    const [email, setemail] = useState('');
    const [password, setpassword] = useState('');
    const [cpassword, setcpassword] = useState('');

    const [loading,setloading] = useState(false);
    const [error,seterror] = useState();
    const [success,setsuccess] = useState();

    const register = async() =>{

        if(password===cpassword){
            const user ={
                name,email,password,cpassword
            }
            
            try {
                setloading(true);
                const result = (await axios.post("/api/users/register",user)).data
                setloading(false)
                setsuccess(true);
                Swal.fire("Congratulations","You have registered successfully", "success");

                setname('');
                setemail('');
                setpassword('');
                setcpassword('');

            } catch (error) {
                setloading(false);
                console.log(error)
                seterror(true)
                Swal.fire("OOPS","Something went wrong","error")
            }
        }else{
            alert("Password doesn't match")
        }
    }
    return (
        <div>
        {loading && <Loader/>}
        
        

            <div className='row justify-content-center mt-5  m-3' data-aos="fade-in">
                <div className='col-md-5 bs4 mt-5 ' style={{backgroundColor:"white"}}> 
                {success && <Success message="Registration Successful"/>}
                {error && <Error/>}
                    <div>
                        <h2 className='text-center' style={{fontWeight:"bolder"}}>REGISTER</h2>
                        <input className='form-control ' type="text" placeholder='Name' value={name} onChange={(e) => { setname(e.target.value) }} />
                        <input className='form-control ' type="text" placeholder='Email' value={email} onChange={(e) => { setemail(e.target.value) }}/>
                        <input className='form-control ' type="text" placeholder='Password' value={password} onChange={(e) => { setpassword(e.target.value) }}/>
                        <input className='form-control ' type="text" placeholder='Confirm Password' value={cpassword} onChange={(e) => { setcpassword(e.target.value) }}/>
                        <p className='mt-3'>Already have an account ? <a href='/login' style={{textDecoration:"underline"}}>Login here</a></p>

                        <button className='btn btn-dark mt-3' style={{float:"right"}} onClick={register}>Register</button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Registerscreen
