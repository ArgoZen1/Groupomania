import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { isEmpty } from '../Utils';

const CardComments = ({ post }) => {
    const [text, setText] = useState("")
    const usersData = useSelector((state) => state.usersReducer);
    const userData = useSelector((state) => state.usersReducer);
    const dispatch = useDispatch();

    const handleComment = () => {

    }
    console.log(post)

    return (
        <div className='comments-container'>
            {post.comments.map((comment) => { 
                return (
                    <div className={comment.userId === userData.id ? 
                    "comment-container client" : "comment-container"} key={comment.id}>
                    <div className='left-part'>
                        <img src={!isEmpty(usersData[0]) && usersData.map((user) => {
                            if (user.id === comment.userId) return user.picture;
                            else return null
                        }).join("")
                        } alt="commenter-pic" />
                        </div>
                    </div>
                )
            
            })}
        </div>
    );
};

export default CardComments;