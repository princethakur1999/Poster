import './GlobalPost.css';

import { Link } from 'react-router-dom';



export default function GlobalPost({ post, username, photo }) {

    const postDate = new Date(post.date);

    const formattedDate = postDate.toLocaleDateString('en-GB', {
        day: 'numeric',
        month: 'short',
        year: 'numeric'
    });

    return (

        <div className='global-post'>

            <div className='ud'>

                <Link to={`/user/${username}`} className='g-photo-name'>

                    <img src={photo} alt="user-photo" className='g-photo' />

                    <span className='g-username' >{username} </span>

                </Link>

                <p className='g-date'>{formattedDate}</p>

            </div>

            <p className='g-content'>{post.description}</p>


            <img className='g-img' src={post.image} alt="postpic" />
        </div>
    );
}
