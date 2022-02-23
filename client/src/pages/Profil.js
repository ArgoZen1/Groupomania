import React, { useContext } from 'react';
import Log from '../components/Log'
import { UidContext } from '../components/AppContext';
import UpdateProfil from '../components/Profil/UpdateProfil';






const Profil = () => {
    const uid = useContext(UidContext); // id de l'utilisateur si jamais il est connecté 



    return (
        
        <div className="profil-page">
        
            {uid ? (
    <UpdateProfil />
) : (
            <div className="log-container">
            

                <Log signin={false} signup={true} />
                <div className="img-container">
                    <img className='img-logo' src="./img/icon-blue.png" alt="logo groupomania" />
                </div>

            </div>
)}
        </div>


    );


};


export default Profil;