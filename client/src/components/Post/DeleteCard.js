import React from 'react';
import { useDispatch } from 'react-redux';
import { deletePost, getPosts } from '../../actions/post.actions';

const DeleteCard = (props) => {

    const dispatch = useDispatch();

    const deleteQuote = async () => {
        await dispatch(deletePost(props.id))
        dispatch(getPosts())

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