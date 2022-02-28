import React, { useContext } from 'react';
import { useSelector } from 'react-redux';
import { NavLink } from 'react-router-dom';
import { UidContext } from './AppContext';
import Logout from './Log/Logout';

const Navbar = () => {
    // la navBar réagit celon si le Uid existe ou non
    const uid = useContext(UidContext);
    const userData = useSelector((state) => state.userReducer);
    
   

    return (
        <nav>
           <div className='nav-container'>
               <div className='logo'>
                <NavLink to ="/profil">
                 <div className='logo'>
                 <img src="./img/icon.svg" alt='icon' /> 
                 <h3>Groupomania</h3>
                 </div>   
                </NavLink>   
               </div>
               {uid ? (
                   <ul>
                           <li className='welcome'>
                           <NavLink to="/profil">
                               <h5>Bienvenue {userData.firstname + " "+userData.name}</h5>
                           </NavLink>
                       </li>
                       <Logout />
                   </ul>
               ) : (
                   <ul>
                       <li></li>
                       <li>
                           <NavLink to ="/profil">
                               <img src="./img/login.svg" alt="logo login" />
                           </NavLink>
                       </li>
                   </ul>
               )}
           </div>
        </nav>
    );
};

export default Navbar;