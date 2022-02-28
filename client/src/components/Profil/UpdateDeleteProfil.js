import React, { useState } from 'react';
// pour récupérer les données depuis notre store
import { useDispatch, useSelector } from 'react-redux';
import { deleteUser, updateBio } from '../../actions/user.actions';


import LeftNav from '../LeftNav';
import { dateParser } from '../Utils';
import UploadImg from './UploadImg';

const UpdateProfil = (props) => {
    const [bio, setBio] = useState('');
    const [updateForm, setUpdateForm] = useState(false);
    const userData = useSelector((state) => state.userReducer)
    const dispatch = useDispatch();

    const deleteProfilUser = () => {
        dispatch(deleteUser(userData.id))
        window.location.reload()
        window.confirm('Votre compte a été supprimé')
    }

    const handleUpdate = () => {
       dispatch(updateBio(userData.id, bio));
       setUpdateForm(false);
    }

    return (
        <div className='profil-container'>
            <LeftNav />
            <h1> Profil de {userData.firstname + " "+userData.name}</h1>
            <div className='update-container'>
             <div className='left-part'>
             <h3>Photo de profil</h3>
             <img src={userData.picture} alt="user-pic" />  
             <UploadImg />
             </div>
             <div className='right-part'>
                <div className='bio-update'>
                   <h3>Biographie</h3>
                   {updateForm === false && (
                       <>
                       <p onClick={() => setUpdateForm(!updateForm)}>{userData.bio}</p>
                       <button onClick={() => setUpdateForm(!updateForm)}>Modifier la biographie</button>
                       </>
                   )}
                   {updateForm && (
                      <>
                       <textarea type="text" 
                       defaultValue={userData.bio} 
                       onChange={(e) => setBio(e.target.value)}>    
                       </textarea>
                       <button onClick={handleUpdate}>Valider les modifications</button>  
                      </> 
                   )} 
                </div>
                <h4>Membre depuis le : {dateParser(userData.createdAt)}</h4>
                <button onClick={ () => {
                    if (window.confirm('êtes vous sûr de vouloir supprimer votre compte Groupomania ?'))
                    { deleteProfilUser() }
                }}>Supprimer le compte

                </button>
             </div>
             
            </div>
        </div>
    );
};

export default UpdateProfil;