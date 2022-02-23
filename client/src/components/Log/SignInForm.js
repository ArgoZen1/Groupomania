import React, { useState } from 'react';
import axios from 'axios';

const SignInForm = () => {
    // on récupére la valeur de notre input dans useState('')
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleLogin = (e) => {
         e.preventDefault();
         const emailPasswordError = document.querySelector('.password.error');

         axios({
             method:"POST",
             url:`${process.env.REACT_APP_API_URL}api/user/login`,
             withCredentials: true,
             data: {
                 email,
                 password
             },
             console
         })
         .then((res) => {
             if(res.data.errors) {
                 emailPasswordError.innerHTML = res.data.errors;
                 
             } else {
                 window.location = "/"
             }
             
             
         })
         
         .catch((err) => {
             console.log(err);
         });
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