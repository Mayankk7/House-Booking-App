import React, { useState, useEffect } from 'react'
import axios from "axios"
import { Tabs } from 'antd';
import Loader from '../components/Loader';
import Error from "../components/Error";
import Swal from "sweetalert2"
import Bookings from '../components/Admin/Bookings';
import Rooms from '../components/Admin/Rooms';
import Users from '../components/Admin/Users';
import Addroom from '../components/Admin/Addroom';

const { TabPane } = Tabs;

const Adminscreen = () => {

    useEffect(() => {

        const user = JSON.parse(localStorage.getItem("currentUser"))
        console.log(user.isAdmin)
        if (!user.isAdmin) {
            window.location.href = "/home"
        }
    }, [])


    return (
        <div className='m-5 bs ' style={{ backgroundColor: "white" }}>
            <h2 className='text-center' style={{ fontSize: '30px' }}><b>Admin Panel</b></h2>
            <Tabs defaultActiveKey="1">
                <TabPane tab="Bookings" key="1" style={{ marginBottom: "15vh" }}>
                    <Bookings />
                </TabPane>
                <TabPane tab="Rooms" key="2" style={{ marginBottom: "15vh" }}>
                    <Rooms />
                </TabPane>
                <TabPane tab="Add Rooms" key="3" style={{ marginBottom: "15vh" }}>
                    <Addroom />
                </TabPane>
                <TabPane tab="Users" key="4" style={{ marginBottom: "15vh" }}>
                    <Users />
                </TabPane>
            </Tabs>
        </div>
    )
}

export default Adminscreen

