import React, { useEffect, useState } from 'react';

import { useDispatch, useSelector } from 'react-redux';


import { getPosts, updatePost } from '../../actions/post.actions';

import { dateParser, isEmpty } from '../Utils';
import CardComments from './CardComments';
import DeleteCard from './DeleteCard';

const Card = ({ post }) => {




    // ici nous avons un spinner, en attendant de récupérer notre userData 

    const [isLoading, setIsLoading] = useState(true);
    const [isUpdated, setIsUpdated] = useState(false);
    const [textUpdate, setTextUpdate] = useState(null);
    const [showComments, setShowComments] = useState(false);
    const usersData = useSelector((state) => state.usersReducer);
    const userData = useSelector((state) => state.userReducer);
    const dispatch = useDispatch();

    const updateItem = async () => {

        if (textUpdate) {
            await dispatch(updatePost(post.id, textUpdate))
            dispatch(getPosts())


        }
        setIsUpdated(false);
    }

    useEffect(() => {
        !isEmpty(usersData[0]) && setIsLoading(false);
    }, [usersData])


    return (
        <li className='card-container' key={post.id}>
            {isLoading ? (
                <i className='fas fa-spinner fa-spin'></i>
            ) : (
                <>
                    <div className='card-left'>
                        <img src={!isEmpty(usersData[0]) && usersData.map((user) => {
                            if (user.id === post.userId) return user.picture;
                            else return null
                        }).join("")
                        } alt="poster-pic" />
                    </div>
                    <div className='card-right'>
                        <div className='card-header'>
                            <div className='pseudo'>
                                <h3>
                                    {!isEmpty(usersData[0]) && usersData.map((user) => {
                                        if (user.id === post.userId) return user.firstname + ' ' + user.name;
                                        else return null
                                    }).join("")
                                    }
                                </h3>

                            </div>
                            <span>{dateParser(post.createdAt)}</span>
                        </div>
                        {isUpdated === false && <p>{post.message}</p>}
                        {isUpdated && (
                            <div className='update-post'>
                                <textarea
                                    defaultValue={post.message}
                                    onChange={(e) => setTextUpdate(e.target.value)}
                                />
                                <div className='button-container'>
                                    <button className='btn' onClick={updateItem}>
                                        Valider modification
                                    </button>
                                </div>
                            </div>
                        )}
                        {post.picture && <img src={post.picture} alt="card-pic" className='card-pic' />}
                        {post.video && (
                            <iframe
                                width="500"
                                height="300"
                                src={post.video}
                                frameBorder="0"
                                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                allowFullScreen
                                title={post.id}
                            ></iframe>
                        )}
                        {userData.id === post.userId && !userData.admin && (

                            <div className='button-container'>
                                <div onClick={() => setIsUpdated(!isUpdated)}>
                                    <img src='./img/edit.svg' alt='icon edit' />
                                </div>
                                <DeleteCard id={post.id} />
                            </div>
                        )}
                        {userData.admin && (

                            <div className='button-container-admin'>

                                <div onClick={() => setIsUpdated(!isUpdated)}>
                                    <img src='./img/edit.svg' alt='icon edit' />
                                </div>
                                <DeleteCard id={post.id} />
                            </div>
                        )}
                        <div className='card-footer'>
                            <div className='comment-icon'>
                                <img onClick={() => setShowComments(!showComments)}
                                    src='./img/message1.svg'
                                    alt='comment' />
                            </div>
                        </div>
                        {showComments && <CardComments post={post} />}
                    </div>
                </>
            )}
        </li>
    );
};

export default Card;