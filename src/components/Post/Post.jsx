import './Post.css';

import { MdDelete } from "react-icons/md";

import axios from 'axios';
import toast from 'react-hot-toast';


// const BACKEND = "http://localhost:4000";

const BACKEND = import.meta.env.VITE_REACT_APP_API_URL;


export default function Post({ post, username }) {


    async function deletePost(username, postid) {

        try {

            const response = await axios.delete(`${BACKEND}/delete-post`, { data: { username, postid } });

            if (!response.data.success) {

                throw new Error("Failed to delete the post");
            }

            toast.success("Post deleted!🔥");

            window.location.reload();

        } catch (e) {

            console.log(e);
        }
    }



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
        <div className='post'>

            <p className='username'>{username}</p>

            <p className='content'>{post.description}</p>

            {
                post.image &&
                <img className='img' loading='lazy' src={post.image} alt="postpic" />
            }

            <p className='date'>{formattedDate}</p>

            <div className='likes'>{post.likes || 0}</div>


            <div className='remove-post'>

                <MdDelete onClick={() => deletePost(username, post._id)} />

            </div>
        </div>
    );
}
