import React from 'react';
import { useDispatch } from 'react-redux';
import { deletePost } from '../../actions/post.actions';

const DeleteCard = (props) => {

    const dispatch = useDispatch();

    const deleteQuote = () => {
        dispatch(deletePost(props.id))
        window.location.reload();
    }

    return (
        <div onClick={() => {
            if (window.confirm('Voulez vous supprimer cet article ?')) {
                deleteQuote();
            }

        }}>
            <img src='./img/trash.svg' alt="icon delete" />
        </div>
    );
};

export default DeleteCard;