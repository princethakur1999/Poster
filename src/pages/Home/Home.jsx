import './Home.css';
import GlobalPost from './../../components/GlobalPost/GlobalPost.jsx';
import Login from './../../components/Login/Login.jsx';
import Online from '../../components/Online/Online.jsx';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';

import axios from 'axios';

// const BACKEND = "http://localhost:4000";

const BACKEND = import.meta.env.VITE_REACT_APP_API_URL;

export default function Home() {

    const token = useSelector((state) => state.auth.token);

    const [posts, setPosts] = useState(null);

    const [loading, setLoading] = useState(false);


    async function getPosts() {

        try {

            console.log("AA GYA JI: ", BACKEND);


            setLoading(true);

            const response = await axios.get(`${BACKEND}/posts`);

            if (!response.data.success) {

                throw new Error(response.data.message);
            }
            setPosts(response.data.posts);

        } catch (e) {

            console.log(e);

            alert(`Failed to fetch posts`);

        } finally {

            setLoading(false);
        }
    }

    useEffect(() => {

        if (token) {

            getPosts();
        }

    }, [token]);

    if (!token) {

        return <Login />;
    }

    return (

        <div className='home'>

            <Online  />

            {
                loading ?
                    (
                        < div className='loader'></div>
                    )
                    :
                    (
                        <div className='top50'>


                            {
                                posts?.map((post) => (

                                    <GlobalPost key={post._id} post={post} username={post.user.username} photo={post.user.photo} />
                                ))
                            }

                            {
                                !loading &&
                                (
                                    posts && posts.length >= 0 ? null : <p>No posts found.</p>
                                )
                            }

                        </div>
                    )
            }


        </div>
    );
}
