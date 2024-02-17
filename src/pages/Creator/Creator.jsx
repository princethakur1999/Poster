import './Creator.css';

import axios from 'axios';

import { useState } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import Error from './../../components/Error/Error.jsx';

import { toast } from 'react-hot-toast';

// const BACKEND = "http://localhost:4000";


const BACKEND = import.meta.env.VITE_REACT_APP_API_URL;



export default function Creator() {

    const token = useSelector((state) => state.auth.token);

    const navigate = useNavigate();

    const [post, setPost] = useState({ description: '', img: '' });

    const [loading, setLoading] = useState(false);


    function changeHandler(e) {

        const { name, value } = e.target;

        if (name === 'img') {

            setPost((prev) => ({ ...prev, [name]: e.target.files[0] }));

        } else {

            setPost((prev) => ({ ...prev, [name]: value }));
        }
    }

    async function submitHandler(e) {

        e.preventDefault();

        try {

            setLoading(true);

            const me = localStorage.getItem('me') ? JSON.parse(localStorage.getItem('me')) : null;

            const formData = new FormData();

            formData.append('description', post.description);
            formData.append('img', post.img);
            formData.append('additionalData', JSON.stringify(me));

            const response = await axios.post(`${BACKEND}/create`, formData, {

                headers: { 'Content-Type': 'multipart/form-data' },
            });

            if (!response.data.success) {

                throw new Error('Something went wrong');
            }

            toast.success('Post created🎉');

            navigate('/profile');

        } catch (error) {
            console.error(error);

            toast.error('Something went wrong!');
        }

        finally {

            setLoading(false);
        }
    }

    if (!token) {

        return <Error />;

    } else {

        return (

            <div className='creator'>

                <form onSubmit={submitHandler} autocomplete="off">

                    <textarea
                        name='description'
                        placeholder='Description...'
                        cols='30'
                        rows='10'
                        value={post.description}
                        onChange={changeHandler}
                        className='input-field'
                    ></textarea>

                    <label className='file-upload'>
                        <input
                            type='file'
                            name='img'
                            onChange={changeHandler}
                            accept='image/*'
                            className='input-file'
                        />
                        <div className='file-input-container'>
                            <span className='file-text'>{post.img ? post.img.name : 'Choose an Image'}</span>
                        </div>
                    </label>

                    {
                        post.img &&
                        (
                            <div className='image-preview'>
                                <img src={URL.createObjectURL(post.img)} alt='Preview' />
                            </div>
                        )
                    }

                    <p className="required-message">All fields are required.</p>



                    <button className='btn'>

                        {
                            loading ? "Processing..." : "Create"
                        }

                    </button>
                </form>
            </div>
        );
    }
}
