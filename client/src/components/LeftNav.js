import React from 'react';
import { NavLink } from 'react-router-dom';

const LeftNav = () => {
    return (
        <div className='left-nav-container'>
            <div className='icons'>
                <div className='icons-bis'>
                    <NavLink className={(navData) => navData.isActive ? "active-left-nav" : ""} to="/">
                        <img src='./img/home.svg' alt="home icon" />
                    </NavLink>
                    <br />
                    <NavLink className={(navData) => navData.isActive ? "active-left-nav" : ""} to="/profil">
                        <img src='./img/user.svg' alt="user icon" />
                    </NavLink>
                </div>
            </div>
        </div>
    );
};

export default LeftNav;