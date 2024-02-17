import './Profile.css';
import Error from './../../components/Error/Error.jsx';
import Post from './../../components/Post/Post.jsx';

import { useEffect, useState } from 'react';

import { useDispatch, useSelector } from 'react-redux';
import { setToken } from './../../slices/authSlice.js';

import axios from 'axios';

import { toast } from 'react-hot-toast';

import { MdOutlineNoteAdd } from "react-icons/md";
import { FaUserEdit } from "react-icons/fa";
import { IoMdAdd, IoIosClose } from "react-icons/io";

import { Link, useNavigate } from 'react-router-dom';
import { NavLink } from 'react-router-dom';



// const BACKEND = "http://localhost:4000";


const BACKEND = import.meta.env.VITE_REACT_APP_API_URL;


export default function Profile() {

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const token = useSelector((state) => state.auth.token);

    let me = JSON.parse(localStorage.getItem("me"));

    const [user, setUser] = useState([]);

    const [newPhoto, setNewPhoto] = useState(null);

    const [showPhotoChanger, setShowPhotoChanger] = useState(false);

    const [loading, setLoading] = useState(false);

    function changeHandler(e) {

        e.preventDefault();

        setNewPhoto(e.target.files[0]);
    }

    async function submitHandler(e) {

        e.preventDefault();

        try {

            setLoading(true);

            console.log(me);

            const formData = new FormData();

            formData.append("newPhoto", newPhoto);
            formData.append("userId", me.userId);

            const response = await axios.post(`${BACKEND}/change-photo`, formData);


            if (!response.data.success) {

                throw new Error(response.data.message);
            }

            setShowPhotoChanger(false);

            getUser();

            toast.success("Photo updated 😍");

        } catch (e) {

            console.log(e);

            alert(e.message);

            setShowPhotoChanger(false);

        }
        finally {
            setLoading(false);
        }
    }

    const logout = () => {

        dispatch(setToken(null));

        localStorage.removeItem('token');
        localStorage.removeItem('me');

        navigate('/login');

        toast.success("Logout successful");
    };

    async function getUser() {

        try {

            if (me) {

                const id = me.userId;

                const response = await axios.get(`${BACKEND}/profile/${id}`);

                if (!response.data.success) {

                    throw new Error(response.data.message);
                }

                setUser(response.data.user);

            } else {

                throw new Error("User data not found in localStorage");
            }

        } catch (e) {

            toast.error("Failed to fetch the user!");
        }
    }

    useEffect(() => {

        getUser();

    }, []);

    if (!token) {

        return <Error />;
    }

    const openPhotoChanger = () => {

        setShowPhotoChanger(true);
    };

    const closePhotoChanger = () => {

        setShowPhotoChanger(false);
    };

    return (

        <div className='my-profile'>

            {
                showPhotoChanger &&
                (
                    <form onSubmit={submitHandler} className='photo-changer'>

                        <div className='close-btn-container'>
                            <IoIosClose className='close-btn' onClick={closePhotoChanger} />
                        </div>

                        <input
                            type="file"
                            name='newPhoto'
                            onChange={changeHandler}
                            accept='image/*'
                            className='selector'
                        />

                        <button className='change-button'>
                            {
                                loading ? 'Processing...' : 'Save'
                            }
                        </button>
                    </form>
                )
            }

            {
               user && user.username ?
                    (
                        <div className='user'>

                            <p className='my-bio'>{user.bio}</p>

                            <div className='photo-box' onClick={openPhotoChanger}>

                                <img className='avatar' src={user.photo} alt='avatar' />

                                <IoMdAdd className='change-photo' />

                            </div>

                            <p className='my-name'>{user.username}</p>

                            <p className='total-post'>Posts {user.posts ? user.posts.length : 0}</p>


                            <Link to="/edit-profile" className='edit'>
                                <FaUserEdit />
                            </Link>


                            <NavLink to="/create" className='create-logo'>
                                <MdOutlineNoteAdd />
                            </NavLink>

                            <p className='logout' onClick={logout}>
                                Logout
                            </p>
                        </div>
                    )
                    :
                    (
                        < div className='loader'></div>
                    )
            }

            <div className='my-posts'>
                {
                     user?.posts?.length > 0 ?
                        (
                            user.posts.map((post) => <Post key={post._id} post={post} username={user.username} />)
                        )
                        :
                        (
                          <p className="no-posts">No posts found!</p>
                        )
                }
            </div>
        </div>
    );
}