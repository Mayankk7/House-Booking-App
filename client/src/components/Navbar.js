import React from 'react'

const Navbar = () => {

    const user = JSON.parse(localStorage.getItem('currentUser'));

    const logout = () => {
        localStorage.removeItem('currentUser');
        window.location.href="/loginform"
    }
    return (
        <div>
            <nav class="navbar navbar-expand-lg bg-dark">
                <a class="navbar-brand mx-5" href="/home">ROOMZAPPY</a>
                <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                    <span class="navbar-toggler-icon mx-5"><i class="fa fa-bars" style={{color:"white"}}></i></span>
                </button>
                <div class="collapse navbar-collapse" id="navbarNav">
                    <ul class="navbar-nav mx-5">
                        {user ? (<>
                            <div class="dropdown mx-5">
                                <button class="btn btn-secondary dropdown-toggle" type="button" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                    <i className='fa fa-user mx-2'></i>{user.name}
                                </button>
                                <div class="dropdown-menu" aria-labelledby="dropdownMenuButton">
                                    <a class="dropdown-item" href="/profile">Profile</a>
                                    <a class="dropdown-item" href="#" onClick={logout}>Logout</a>
                                </div>
                            </div>
                        </>) : (
                            <>
                                <li class="nav-item active">
                                    <a class="nav-link" href="/registerform">Register</a>
                                </li>
                                <li class="nav-item">
                                    <a class="nav-link" href="/loginform">Login</a>
                                </li>
                            </>
                        )}
                    </ul>
                </div>
            </nav>
        </div>
    )
}

export default Navbar
