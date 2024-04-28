// Navbar.jsx
import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { AuthContext } from '../AuthContext';


const Navbar = () => {
    const { authData, logout } = useContext(AuthContext);

    const handleLogout = () => {
        console.log('Logout clicked');
        logout();
        // Optionally, you can redirect the user to the login page after logout
    };

    return (
        <div style={{ backgroundColor: 'bisque' }}>
            <nav className="navbar navbar-expand-lg bg-light text-white mb-2 mt-2" style={{ fontWeight: 'bold', fontSize: '20px', boxShadow: '0px 2px 4px rgba(0.5, 0.5, 0.3, 0.3)' }}>
                <div className="container-fluid">
                    <Link className="navbar-brand" to="/">
                        <a className="d-inline-flex align-items-center mb-2 text-body-emphasis text-decoration-none" href="/" aria-label="Bootstrap">
                            <svg xmlns="http://www.w3.org/2000/svg" width="40" height="32" className="d-block me-2" viewBox="0 0 118 94" role="img"><title>BIJOY eComm. Store</title><path fillRule="evenodd" clipRule="evenodd" d="M24.509 0c-6.733 0-11.715 5.893-11.492 12.284.214 6.14-.064 14.092-2.066 20.577C8.943 39.365 5.547 43.485 0 44.014v5.972c5.547.529 8.943 4.649 10.951 11.153 2.002 6.485 2.28 14.437 2.066 20.577C12.794 88.106 17.776 94 24.51 94H93.5c6.733 0 11.714-5.893 11.491-12.284-.214-6.14.064-14.092 2.066-20.577 2.009-6.504 5.396-10.624 10.943-11.153v-5.972c-5.547-.529-8.934-4.649-10.943-11.153-2.002-6.484-2.28-14.437-2.066-20.577C105.214 5.894 100.233 0 93.5 0H24.508zM80 57.863C80 66.663 73.436 72 62.543 72H44a2 2 0 01-2-2V24a2 2 0 012-2h18.437c9.083 0 15.044 4.92 15.044 12.474 0 5.302-4.01 10.049-9.119 10.88v.277C75.317 46.394 80 51.21 80 57.863zM60.521 28.34H49.948v14.934h8.905c6.884 0 10.68-2.772 10.68-7.727 0-4.643-3.264-7.207-9.012-7.207zM49.948 49.2v16.458H60.91c7.167 0 10.964-2.876 10.964-8.281 0-5.406-3.903-8.178-11.425-8.178H49.948z" fill="currentColor" /></svg>
                            <span className="fs-5">BIJOY eComm. Store</span>
                        </a>
                    </Link>
                    <button
                        className="navbar-toggler"
                        type="button"
                        data-bs-toggle="collapse"
                        data-bs-target="#navbarNav"
                        aria-controls="navbarNav"
                        aria-expanded="false"
                        aria-label="Toggle navigation"
                    >
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarNav">
                        <ul className="navbar-nav me-auto">
                            {/* <li className="nav-item">
                                <Link className="nav-link fw-bolder" to="/">
                                    Home
                                </Link>
                            </li>
                            <li className="nav-item">
                                <Link className="nav-link fw-bolder" to="/products">
                                    Products
                                </Link>
                            </li> */}
                            {authData?.user ? (
                                <>
                                    <li className="nav-item">
                                        <Link className="nav-link fw-bold" to="/">
                                            Home
                                        </Link>
                                    </li>
                                    <li className="nav-item">
                                        <Link className="nav-link fw-bold" to="/products">
                                            Products
                                        </Link>
                                    </li>
                                    <li className="nav-item">
                                        <Link className="nav-link fw-bold" to="/cart">
                                            Cart
                                        </Link>
                                    </li>
                                    <li className="nav-item">
                                        <Link className="nav-link fw-bold" to="/AboutUs">
                                            About Us
                                        </Link>
                                    </li>
                                    <li className="nav-item">
                                        <Link className="nav-link fw-bold" to="/ContactUs">
                                        Contact Us
                                        </Link>
                                    </li>
                                    <li className="nav-item">
                                        <button type='button' className="btn btn-outline-warning btn-link nav-link fw-bold" onClick={handleLogout}>
                                            Logout
                                        </button>
                                    </li>
                                </>) :
                                <>
                                    <li className="nav-item">
                                        <Link className="nav-link fw-bold btn btn-outline-primary" to="/registration">
                                            Registration
                                        </Link>
                                    </li>
                                    <li className="nav-item">
                                        <Link className="nav-link fw-bold btn btn-outline-primary" to="/login">
                                            Login
                                        </Link>
                                    </li>
                                </>}
                        </ul>
                    </div>
                    <li>
                        <Link className='text-decoration-none'>
                            <form className="d-flex" role="search">
                                <input className="form-control me-2" type="search" placeholder="Search" aria-label="Search" />
                                <button className="btn btn-outline-success" type="submit">Search</button>
                            </form>
                        </Link>
                    </li>
                </div>
            </nav>
        </div>
    );
}

export default Navbar;
