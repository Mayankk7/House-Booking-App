import React ,{useState, useEffect} from 'react'
import axios from "axios"

const Homescreen = () => {

    const [rooms,setrooms] = useState([])

    useEffect(async()=>{
        try{
            const response = (await axios.get("/api/rooms/getallrooms")).data
            setrooms(response)
        }catch(error){
            console.log(error);
        }
    },[])


    return (
        <div>
            <h1>there are {rooms.length} rooms </h1>
        </div>
    )
}

export default Homescreen
