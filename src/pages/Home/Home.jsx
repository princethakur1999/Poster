import './Home.css';
import GlobalPost from './../../components/GlobalPost/GlobalPost.jsx';
import Login from './../../components/Login/Login.jsx';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';

import axios from 'axios';

const BACKEND = "http://localhost:4000";

export default function Home() {

    const token = useSelector((state) => state.auth.token);

    const [posts, setPosts] = useState(null);

    const [loading, setLoading] = useState(false);

    async function getPosts() {

        try {

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

                                    <GlobalPost key={post._id} post={post} username={post.user.username} />
                                ))
                            }

                            {
                                posts && posts.length >= 0 ? null : <p>No posts found.</p>
                            }

                        </div>
                    )
            }


        </div>
    );
}
