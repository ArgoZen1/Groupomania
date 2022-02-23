import React, { useState } from 'react';
import axios from 'axios';
import SignInForm from './SignInForm';

const SignUpForm = () => {
    const [formSubmit, setFormSubmit] = useState(false);
    const [name, setName] = useState('');
    const [firstname, setFirstname] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [controlPassword, setControlPassword] = useState('');

    const handleRegister = async (e) => {
        e.preventDefault();

        const nameError = document.querySelector('.name.error');
        const firstnameError = document.querySelector('.firstname.error');
        const emailError = document.querySelector('.email.error');
        const passwordError = document.querySelector('.password.error');
        const passwordConfirmError = document.querySelector('.password-confirm.error');
        const passwordRegex = new RegExp(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{6,}$/);
        const emailRegex = new RegExp(/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/);
        const nameRegex = new RegExp(/^(?=.{1,40}$)[a-zA-Z]+(?:[-'\s][a-zA-Z]+)*$/);
        const firstnameRegex = new RegExp(/^(?=.{1,40}$)[a-zA-Z]+(?:[-'\s][a-zA-Z]+)*$/);

        emailError.innerHTML = "";
        console.log(emailRegex.test(email),"ici")
        if(!emailRegex.test(email)) {
            emailError.innerHTML = "e-mail incorrect"
        }

        nameError.innerHTML = "";
        if (!nameRegex.test(name)) {
            nameError.innerHTML = "Veuillez respecter le bon format"
        }
        firstnameError.innerHTML = "";
        if (!firstnameRegex.test(firstname)) {
            firstnameError.innerHTML = "Veuillez respecter le bon format"
        }

        passwordError.innerHTML = "";
        if (!passwordRegex.test(password)) {
            passwordError.innerHTML = "le mot de passe doit contenir une majuscule, une minuscule et au moins 6 caracteres"
        }

        passwordConfirmError.innerHTML = "";
        if (password !== controlPassword) {
            passwordConfirmError.innerHTML = "Les mots de passe ne correspondent pas"
        } 
        console.log('test')
        
        
        if (password == controlPassword && (emailRegex.test(email) == true) && (nameRegex.test(name) == true) && (firstnameRegex.test(firstname) == true) && (passwordRegex.test(password) == true)) {
            console.log('test2')
            await axios({
                method: "post",
                url: `${process.env.REACT_APP_API_URL}api/user/register`,
                data: {
                    name,
                    firstname,
                    email,
                    password
                }
            })

                .then((res) => {
                    console.log((res))
                    emailError.innerHTML = ""
                    if (res.data.errors) {

                        emailError.innerHTML = res.data.errors.email;
                        
                    } else {
                        setFormSubmit(true);
                    }
                    
                })
                .catch((err) => console.log(err))
            }
    };




    return (
        <>
            {formSubmit ? (
                <>
                    <SignInForm />

                    <h4 className='success'>Enregistrement réussi, veuillez vous connecter</h4>
                </>
            ) : (


                <form action="" onSubmit={handleRegister} id="sign-up-form">
                    <label htmlFor='name'>Nom</label>
                    <br />
                    <input
                        type="text"
                        name="name"
                        id="name"
                        onChange={(e) => setName(e.target.value)}
                        value={name}
                    />
                    <div className='name error'></div>
                    <br />
                    <label htmlFor='firstname'>Prénom</label>
                    <br />
                    <input
                        type="text"
                        name="firstname"
                        id="firstname"
                        onChange={(e) => setFirstname(e.target.value)}
                        value={firstname}
                    />
                    <div className='firstname error'></div>
                    <br />
                    <label htmlFor='email'>Email</label>
                    <br />
                    <input
                        type="text"
                        name="email"
                        id="email"
                        onChange={(e) => setEmail(e.target.value)}
                        value={email}
                    />
                    <div className='email error'></div>
                    <div className='mail error'></div>
                    <label htmlFor='password'>Mot de passe</label>
                    <br />
                    <input
                        type="password"
                        name="password"
                        id="password"
                        onChange={(e) => setPassword(e.target.value)}
                        value={password}
                    />
                    <div className='password error'></div>
                    <br />
                    <label htmlFor='password-conf'>Confirmer mot de passe</label>
                    <br />
                    <input
                        type="password"
                        name="password"
                        id="password-conf"
                        onChange={(e) => setControlPassword(e.target.value)}
                        value={controlPassword}
                    />
                    <div className='password-confirm error'></div>
                    <input type="submit" value="Valider Inscription" />
                </form>
            )}
        </>
    );
};

export default SignUpForm;