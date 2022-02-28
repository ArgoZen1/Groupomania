import React, { useContext, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { deleteComment, editComment, getPosts } from '../../actions/post.actions';

import { UidContext} from '../AppContext'

const EditDeleteComment = ({ comment }) => {

    const usersData = useSelector((state) => state.usersReducer);
    const userData = useSelector((state) => state.userReducer);

    const [isAuthor, setIsAuthor] = useState(false);
    const [edit, setEdit] = useState(false);
    const [text, setText] = useState('');
    const uid = useContext(UidContext);
    const dispatch = useDispatch();

    console.log(comment.userId)
    console.log(uid)
    console.log(comment.id)
    const handleEdit = async (e) => {
       e.preventDefault();

       if(text) {
         await dispatch(editComment(comment.id, text));
         setText('')
         setEdit(false);
         dispatch(getPosts())
         
       }
    }

    const handleDelete = async () => {
        
      await dispatch(deleteComment(comment.id))
      dispatch(getPosts())
      
    }

      useEffect(() => {
          const CheckAuthor = () => {
              if (uid === comment.userId | userData.admin == true ) {
                  setIsAuthor(true);
                  
              }
          }
          CheckAuthor();
      }, [uid, comment.userId])
    

    return (
        <div className='edit-comment'>
            {isAuthor && edit === false && (
                <span onClick={() => setEdit(!edit)}>
                    <img src="./img/edit.svg" alt="edit-comment" />
                </span>
            )}
            {isAuthor && edit && (
                <form action='' onSubmit={handleEdit} 
                className="edit-comment-form">
                <label htmlFor='text' onClick={() => setEdit(!edit)}>Editer</label>
                <br />
                <input type="text" name="text" onChange={(e) => setText(e.target.value)} defaultValue={comment.text} />
                <br />
                <div className='btn'>
                   <span onClick={() => {
                       if(window.confirm("voulez-vous supprimer ce commentaire ?")) {
                           handleDelete();
                       }
                   }}>
                       <img src="./img/trash.svg" alt="icon delete" />
                   </span> 
                   <input type="submit" value="Valider modification" />
                </div>
                

                </form>
            )}
        </div>
    );
};

export default EditDeleteComment;