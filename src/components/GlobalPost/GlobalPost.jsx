import './GlobalPost.css';

import { AiFillLike } from "react-icons/ai";

import { Link } from 'react-router-dom';



export default function GlobalPost({ post, username }) {

    const postDate = new Date(post.date);

    const formattedDate = postDate.toLocaleDateString('en-GB', {
        day: 'numeric',
        month: 'short',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
    });

    return (

        <div className='global-post'>

            <div className='ud'>

                <Link to={`/user/${username}`} className='g-username' >{username}</Link>

                <p className='g-date'>{formattedDate}</p>

            </div>

            <p className='g-content'>{post.description}</p>


            <img className='g-img' src={post.image} alt="postpic" />

            <p className='g-likes'>{post.likes || 0}</p>

            <p className='g-like-btn'>
                <AiFillLike />
            </p>
        </div>
    );
}
