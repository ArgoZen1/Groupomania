import React, { useState } from 'react';
import axios from 'axios';

const SignInForm = () => {

    const emailRegex = new RegExp(/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/);

    // on récupére la valeur de notre input dans useState('')
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleLogin = (e) => {
        e.preventDefault();
        const emailPasswordError = document.querySelector('.password.error');
        const emailError = document.querySelector('.email.error');

        axios({
            method: "POST",
            url: `${process.env.REACT_APP_API_URL}api/user/login`,
            withCredentials: true,
            data: {
                email,
                password
            },

        })

            .then((res) => {
                console.log(res)
                if (res.data.error) {
                    emailError.innerHTML = res.data.error;
                } 
                else {
                    window.location = "/";
                }
                
            })

            .catch((err) => {

                if (err.message.includes("Request failed with status code 400")) {
                    emailPasswordError.innerHTML = "mot de passe incorrect";

                }

                if (err.message.includes("Request failed with status code 429")) {
                    emailPasswordError.innerHTML = "trop de tentatives de connexion, compte bloqué pour 5 minutes";
                }
            })

    }

    return (
        <form action="" onSubmit={handleLogin} id="sign-up-form">
            <label htmlFor="email">Email</label>
            <br />
            <input
                type="text"
                name="email"
                id="email"
                onChange={(e) => setEmail(e.target.value)}
                value={email}
            />
            <br />
            <label htmlFor="password">Mot de passe</label>
            <br />
            <input
                type="password"
                name="password"
                id="password"
                onChange={(e) => setPassword(e.target.value)}
                value={password}
            />
            <div className="password email error"></div>
            <br />
            <input type="submit" value="Connexion" />
        </form>
    );
};

export default SignInForm;