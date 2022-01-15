import React, { useState, useEffect } from 'react'
import axios from "axios"
import Success from '../components/Success';
import Error from '../components/Error';
import Loader from "../components/Loader"

const Registerscreen = () => {

    const [name, setname] = useState('');
    const [email, setemail] = useState('');
    const [password, setpassword] = useState('');
    const [cpassword, setcpassword] = useState('');

    const [loading,setloading] = useState(false);
    const [error,seterror] = useState();
    const [success,setsuccess] = useState();

    const register = async() =>{

        if(password==cpassword){
            const user ={
                name,email,password,cpassword
            }
            
            try {
                setloading(true);
                const result = (await axios.post("/api/users/register",user)).data
                setloading(false)
                setsuccess(true);


                setname('');
                setemail('');
                setpassword('');
                setcpassword('');

            } catch (error) {
                setloading(false);
                console.log(error)
                seterror(true)
            }
        }else{
            alert("Password doesn't match")
        }
    }
    return (
        <div>
        {loading && <Loader/>}
        {error && <Error/>}
        

            <div className='row justify-content-center mt-5'>
                <div className='col-md-5 bs mt-5'>
                {success && <Success message="Registration Successful"/>}
                    <div>
                        <h2 className='text-center'>REGISTER</h2>
                        <input className='form-control ' type="text" placeholder='Name' value={name} onChange={(e) => { setname(e.target.value) }} />
                        <input className='form-control ' type="text" placeholder='Email' value={email} onChange={(e) => { setemail(e.target.value) }}/>
                        <input className='form-control ' type="text" placeholder='Password' value={password} onChange={(e) => { setpassword(e.target.value) }}/>
                        <input className='form-control ' type="text" placeholder='Confirm Password' value={cpassword} onChange={(e) => { setcpassword(e.target.value) }}/>
                        
                        <button className='btn btn-dark mt-5' style={{float:"right"}} onClick={register}>Register</button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Registerscreen
