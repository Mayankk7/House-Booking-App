import React, {useState} from 'react'
import axios from "axios"
import Error from '../components/Error';
import Loader from '../components/Loader';
import AOS from 'aos'
import 'aos/dist/aos.css'

AOS.init(
    {
        duration:1000
    }
);

const Loginscreen = () => {

    const [email, setemail] = useState('');
    const [password, setpassword] = useState('');

    const [loading,setloading] = useState(false);
    const [error,seterror] = useState();

    const login = async() =>{

            const user ={
                email,password
            }
            try {
                setloading(true)
                const result = (await axios.post("/api/users/login",user)).data
                setloading(false)

                localStorage.setItem('currentUser' , JSON.stringify(result));
                window.location.href="/home";

            } catch (error) {
                console.log(error)
                setloading(false)
                seterror(true)

            }
            
    }

    return (
        <div>
            {loading && (<Loader/>)}
            <div className='row justify-content-center mt-5' data-aos="fade-in">
                <div className='col-md-5 bs mt-5 ' style={{backgroundColor:"white"}}>
                    {error && (<Error message="Invalid Credentials"/>)}
                    <div>
                        <h2 className='text-center'>LOGIN</h2>
                        <input className='form-control ' type="text" placeholder='Email' value={email} onChange={(e) => { setemail(e.target.value) }}/>
                        <input className='form-control ' type="text" placeholder='Password' value={password} onChange={(e) => { setpassword(e.target.value) }}/>
                        
                        <button className='btn btn-dark mt-5' style={{float:"right"}} onClick={login}>Login</button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Loginscreen