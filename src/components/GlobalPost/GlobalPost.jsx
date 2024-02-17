import './GlobalPost.css';

import { Link } from 'react-router-dom';



export default function GlobalPost({ post, username }) {

    const postDate = new Date(post.date);

    const formattedDate = postDate.toLocaleDateString('en-GB', {
        day: 'numeric',
        month: 'short',
        year: 'numeric'
    });

    return (

        <div className='global-post'>

            <div className='ud'>

                <Link to={`/user/${username}`} className='g-username' >{username}</Link>

                <p className='g-date'>{formattedDate}</p>

            </div>

            <p className='g-content'>{post.description}</p>


            <img className='g-img' src={post.image} alt="postpic" />
        </div>
    );
}
