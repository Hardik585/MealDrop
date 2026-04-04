import React, { useContext, useState } from 'react';
import { assets } from '../../assets/assets';
import './Menubar.component.css';

import { Link } from 'react-router-dom';
import { StoreContext } from '../../context/StoreContext';
import { toast } from 'react-toastify';

const Menubar = () => {

    const [active, setActive] = useState('home');
    const { quantities, token, setToken, userName, setUserName, setQuantities } = useContext(StoreContext);
    const uniqueItemsInCart = Object.values(quantities).filter(qty => qty > 0).length;
    const firstLetter = userName ? userName.charAt(0).toUpperCase() : "?";

    const handleLogout = () => {
        localStorage.removeItem('token');
        toast.success('logout success');
        setToken('');
        setUserName('');
        setQuantities({});
    }
    return (
        <nav className="navbar navbar-expand-lg bg-body-tertiary">
            <div className="container">
                <Link to="/" onClick={() => setActive('home')}><img src={assets.logo} alt="logo" height={60} width={60} /></Link>
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarSupportedContent">
                    <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                        <li className="nav-item">
                            <Link
                                to="/"
                                onClick={() => setActive('home')}
                                className={`nav-link ${active == 'home' ? 'fw-bold fs-5 active' : ''}`} aria-current="page">
                                Home
                            </Link>
                        </li>
                        <li className="nav-item">
                            <Link
                                to="/explore"
                                onClick={() => setActive('explore')}
                                className={`nav-link ${active == 'explore' ? 'fw-bold fs-5 active' : ''}`}>Explore</Link>
                        </li>
                        <li className="nav-item">
                            <Link
                                to="/contact"
                                onClick={() => setActive('contact')}
                                className={`nav-link ${active == 'contact' ? 'fw-bold fs-5 active' : ''}`}>Contact us</Link>
                        </li>
                    </ul>
                    <div className="d-flex gap-4 align-items-center">
                        <Link to={'/cart'} onClick={() => setActive('')}>
                            <div className='position-relative'>
                                <img src={assets.cart1} alt="cart" height={32} width={32} className='position-relative' />
                                <span className='position-absolute top-0 start-100 translate-middle badge rounded-pill bg-warning'>{uniqueItemsInCart}</span>
                            </div>
                        </Link>
                        {
                            !token ? <>
                                <Link to="/login" className="btn btn-outline-primary">Login</Link>
                                <Link to="/register" className="btn btn-outline-success">Register</Link>
                            </>
                                :
                                <>
                                    <div
                                        className="rounded-circle bg-primary text-white d-flex justify-content-center align-items-center"
                                        style={{
                                            width: "40px",
                                            height: "40px",
                                            fontSize: "18px",
                                            fontWeight: "bold",
                                        }}
                                    >
                                        {firstLetter}
                                    </div>
                                    <Link
                                        onClick={handleLogout}
                                        to="/login"
                                        className="btn btn-outline-danger">Logout</Link>

                                         <Link
                                        to="/my-order"
                                        className="btn btn-outline-success">Orders</Link>
                                </>
                        }
                    </div>
                </div>
            </div>
        </nav>
    )
}

export default Menubar;
