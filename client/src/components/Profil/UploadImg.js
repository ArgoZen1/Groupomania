import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getPosts } from '../../actions/post.actions';
import { uploadPicture } from '../../actions/user.actions';
import { getUsers } from '../../actions/users.actions';

const UploadImg = () => {
    const [file, setFile] = useState();
    const dispatch = useDispatch();
    const userData = useSelector((state) => state.userReducer)
    console.log(file)

    const handlePicture = async (e) => {
        e.preventDefault();
        const data = new FormData();
        data.append("name", userData.name);
        data.append("userId", userData.id)
        data.append('file', file);

       await dispatch(uploadPicture(data, userData.id));

        dispatch(getUsers())

    }
    return (
        <form action="" onSubmit={handlePicture} className="upload-pic">
            <label htmlFor='file'>Changer d'image</label>
            <input
                type="file"
                id="file"
                name="file"
                accept='.jpg, .jpeg, .png'
                onChange={(e) => setFile(e.target.files[0])} />
            <br />
            <input type="submit" value="Envoyer" />
        </form>
    );
};

export default UploadImg;