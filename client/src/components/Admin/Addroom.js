import React, {useState,useEffect} from 'react'
import axios from 'axios';
import Loader from '../Loader';
import Swal from 'sweetalert2';

const Addroom = () => {
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

        console.log(maxcount)
        const newroom = {
            name,
            maxcount,
            phonenumber,
            rentperday,
            description,
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

            <div className='col-md-5' >
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

export default Addroom
