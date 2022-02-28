import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getComments } from '../actions/comment.actions';
import { getPosts } from '../actions/post.actions';
import Card from './Post/Card';
import CardComments from './Post/CardComments';
import { isEmpty } from './Utils';

const Thread = () => {
    
    const [loadPost, setLoadPost] = useState(true)
    const dispatch = useDispatch();
    const posts = useSelector((state) => state.allPostsReducer);
    const comments = useSelector((state) => state.commentReducer)

    useEffect(() => {
        
            dispatch(getPosts());
        
      }, [loadPost, dispatch])

console.log(posts)

    return (
        <div className='thread-container'>
            <ul>
                {!isEmpty(posts.data) && 
                    posts.data.map((post) => {
                        
                        return <Card post={post} key={post.id} />
                    }) 
                }
                
            </ul>
            
        </div>
    );


};

export default Thread;