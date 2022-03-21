import axios from 'axios';
import React, { useEffect, useState } from 'react'
import Swal from 'sweetalert2';

const Navbar = () => {

    const user = JSON.parse(localStorage.getItem('currentUser'));
    const [src, setsrc] = useState('')

    const logout = () => {
        localStorage.removeItem('currentUser');
        window.location.href = "/login"
    }
    return (
        <div>
            <nav class="navbar navbar-expand-lg bg-dark" >
                <a class="navbar-brand mx-5" href="/home"><span ><strong>R</strong></span>oom<span><strong>Z</strong></span>appy</a>

                {user ? (<>
                    <div class="dropdown" style={{ marginRight: "10vh" }}>
                        <button class="btn btn-secondary dropdown-toggle" type="button" style={{ marginLeft: "auto" }} id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                            <i className='fa fa-user mx-2'></i>{user.name}
                        </button>
                        <div class="dropdown-menu" aria-labelledby="dropdownMenuButton">
                            <div style={{ marginLeft: "40px" }}>
                                <img src={"https://avatar.oxro.io/avatar.svg?background=f39c12&rounded=300&name=" + user.name} style={{ width: "10vh" }} />
                            </div>
                            <a class="dropdown-item mt-2" href="/profile">Profile</a>
                            <a class="dropdown-item" href="#" onClick={logout}>Logout</a>
                        </div>
                    </div>
                </>) : (
                    <>
                        <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                            <span class="navbar-toggler-icon mx-5"><i class="fa fa-bars" style={{ color: "white" }}></i></span>
                        </button>
                        <div class="collapse navbar-collapse" id="navbarNav" >
                            <ul class="navbar-nav mx-5" >
                                <li class="nav-item active px-2" style={{ margin: "auto" }} >
                                    <a class="nav-link" href="/register">Register</a>
                                </li>
                                <li class="nav-item px-2" style={{ margin: "auto" }}>
                                    <a class="nav-link" href="/login">Login</a>
                                </li>
                            </ul>
                        </div>
                    </>
                )}

            </nav >
        </div >
    )
}

export default Navbar
