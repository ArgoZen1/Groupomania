import React from 'react';
import axios from 'axios';
import cookie from "js-cookie";

const Logout = () => {
    // pour enlever le cookie 
    const removeCookie = (key) => {
        if (window !== "undefined") {
            cookie.remove(key, { expires: 1});
        }
    }
    const logout = async () => {
        await axios({
            method: 'get',
            url: `${process.env.REACT_APP_API_URL}api/user/logout`,
            withCredentials: true
        })
        .then(() => removeCookie('jwt'))
        .catch((err) => console.log(err));

        window.location = "/profil";
    }
    return (
        <li onClick={logout}>
          <img src="./img/logout.svg" alt="logo logout" />
        </li>
    );
    
};

export default Logout;