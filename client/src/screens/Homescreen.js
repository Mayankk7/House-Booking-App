import React, { useState, useEffect } from 'react'
import axios from "axios"
import Room from '../components/Room'
import Loader from '../components/Loader'
import 'antd/dist/antd.css';
import Error from '../components/Error'
import { DatePicker, Space } from 'antd';
import moment from 'moment';
const { RangePicker } = DatePicker;

const Homescreen = () => {

    const [rooms, setrooms] = useState([])
    const [loading, setloading] = useState()
    const [error, seterror] = useState()

    const [fromdate, setfromdate] = useState();
    const [todate, settodate] = useState();
    const [duplicaterooms, setduplicaterooms] = useState([])

    const [searchkey,setsearchkey] = useState('');
    const [type,settype] = useState('');

    useEffect(async () => {
        try {
            setloading(true)

            const response = (await axios.get("/api/rooms/getallrooms")).data
            setrooms(response)
            setduplicaterooms(response)
            setloading(false)

        } catch (error) {
            seterror(true)
            console.log(error);
            setloading(false);
        }
    }, [])

    const filterbyDate = (dates) => {

        setfromdate(moment(dates[0]).format("DD-MM-YYYY"));
        settodate(moment(dates[1]).format("DD-MM-YYYY"));


        var temprooms = [];
        var availability = false;

        for (const room of duplicaterooms) {

            if (room.currentbookings.length > 0) {

                for ( const booking of room.currentbookings) {

                    if (!(moment(moment(dates[0]).format("DD-MM-YYYY")).isBetween(booking.fromdate, booking.todate))
                        && !(moment(moment(dates[1]).format("DD-MM-YYYY")).isBetween(booking.fromdate, booking.todate))
                    ) {

                        if (moment(dates[0]).format("DD-MM-YYYY") !== booking.fromdate &&
                            moment(dates[0]).format("DD-MM-YYYY") !== booking.todate &&
                            moment(dates[1]).format("DD-MM-YYYY") !== booking.fromdate &&
                            moment(dates[1]).format("DD-MM-YYYY") !== booking.todate) { availability = true }
                    }


                }
            }

            if(availability == true || room.currentbookings.length == 0){
                temprooms.push(room);

            }

            setrooms(temprooms);
        }
    }

    const filterBySearch = () =>{

        const temprooms = duplicaterooms.filter(room => room.name.toLowerCase().includes(searchkey.toLowerCase()))
        setrooms(temprooms)

    }

    const filterByType = (e) => {

        settype(e)
        
        if(e!=="all"){
            const temprooms = duplicaterooms.filter(room=>room.type.toLowerCase()==e.toLowerCase())
            setrooms(temprooms)
        }
        else{
            setrooms(duplicaterooms)
        }

    }

    return (
        <div className='container'>

            <div className='row mt-5 bs' style={{backgroundColor:"white"}}>
                <div className='col-md-3'>
                    <RangePicker format="DD-MM-YYYY" onChange={filterbyDate} />
                </div>

                <div className='col-md-5'>
                    <input type="form-control " placeholder='Search Rooms'
                        value={searchkey} onChange={(e)=>{setsearchkey(e.target.value)}}
                        onKeyUp={filterBySearch}
                    />
                </div>

                <div className='col-md-3'>
                <select className='form-control' value={type} onChange={(e)=>{filterByType(e.target.value)}}>
                    <option value="all">All</option>
                    <option value="delux">Delux</option>
                    <option value="non-delux">Non-Delux</option>
                </select>
                </div>
            </div>


            <div className='row justify-content-center mt-5'>
                {loading ? (<Loader />) : (rooms.map(room => {
                    return <div className='col-md-9 mt-2'>
                        <Room room={room} fromdate={fromdate} todate={todate} />
                    </div>;
                }))}
            </div>
        </div>
    )
}

export default Homescreen
