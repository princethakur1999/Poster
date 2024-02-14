import './User.css';
import Error from './../../components/Error/Error.jsx';
import UserPost from './UserPost/UserPost.jsx';

import { useEffect, useState } from 'react';

import { useParams } from 'react-router-dom';

import { useSelector } from 'react-redux';


import axios from 'axios';


const BACKEND = "http://localhost:4000";


export default function Profile() {


    const { username } = useParams();


    const token = useSelector((state) => state.auth.token);


    const [user, setUser] = useState([]);

    const [loading, setLoading] = useState(false);



    async function getUser() {

        try {

            setLoading(true);

            let response = await axios.get(`${BACKEND}/user/${username}`);

            if (!response.data.success) {

                throw new Error("Failed to fetch user data");
            }

            setUser(response.data.user);


        } catch (e) {

            console.log(e);

        }
        finally {
            setLoading(false);
        }

    }

    useEffect(() => {

        getUser();

    }, []);



    if (!token) {

        return <Error />;
    }

    return (

        <div className='user-data'>

            <div className='profile'>

                {
                    user && user.username ?
                        (
                            <div className='users'>

                                <p className='bio'>{user.bio}</p>

                                <div className='photo-box'>
                                    <img className='avatar' src={user.photo} alt='avatar' />
                                </div>

                                <p className='name'>{user.username}</p>

                                <p className='posts-length'>Posts {user.posts ? user.posts.length : 0}</p>

                            </div>
                        )
                        :
                        (
                            loading ? (<p>Loading...</p>) : (<p>{username}</p>)
                        )
                }

                <div className='posts'>
                    {
                        user?.posts?.length > 0 ?
                            (
                                user.posts.map((post) => <UserPost key={post._id} post={post} username={user.username} />)
                            )
                            :
                            (
                                <p className="no-posts-found">No posts found!</p>
                            )
                    }
                </div>
            </div>
        </div>
    );
}