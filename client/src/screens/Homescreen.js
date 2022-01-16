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

    return (
        <div className='container'>

            <div className='row mt-5 bs'>
                <div className='col-md-3'>
                    <RangePicker format="DD-MM-YYYY" onChange={filterbyDate} />
                </div>

                <div className='col-md-3'>
                    <input type="form-control" placeholder='Search Rooms'/>
                </div>
            </div>


            <div className='row justify-content-center mt-5'>
                {loading ? (<Loader />) : rooms.length > 1 ? (rooms.map(room => {
                    return <div className='col-md-9 mt-2'>
                        <Room room={room} fromdate={fromdate} todate={todate} />
                    </div>;
                })) : (<Error />)}
            </div>
        </div>
    )
}

export default Homescreen
