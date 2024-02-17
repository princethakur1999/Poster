import './Edit.css';


import Error from './../../../components/Error/Error.jsx';

import { useState } from "react";

import { useNavigate } from 'react-router-dom';

import axios from 'axios';

import { toast } from 'react-hot-toast';



// const BACKEND = "http://localhost:4000";


const BACKEND = import.meta.env.VITE_REACT_APP_API_URL;



export default function Edit() {

    const navigate = useNavigate();

    const [user, setUser] = useState({ username: "", bio: "" });

    const token = localStorage.getItem("token");

    const [loading, setLoading] = useState(false);


    function changeHandler(event) {


        const { name, value } = event.target;

        setUser((prev) => ({ ...prev, [name]: value }));

    }

    async function submitHandler(event) {

        event.preventDefault();


        try {

            setLoading(true);

            const formData = new FormData();

            formData.append("username", user.username);

            formData.append("bio", user.bio);


            const me = JSON.parse(localStorage.getItem("me"));

            let id = me.userId;

            const response = await axios.post(`${BACKEND}/edit-profile/${id}`, formData);

            if (!response.data.success) {

                throw Error(response.data.message);
            }

            toast.success("Profile edited successfully");

            navigate("/profile");

        } catch (e) {

            console.log(e);

            toast.error(e.message);
        }
        finally {

            setLoading(false);
        }
    }

    if (!token) {

        return <Error />;
    }

    return (

        <form onSubmit={submitHandler} autocomplete="off">

            <h2>Change</h2>

            <input
                type="text"
                name="username"
                onChange={changeHandler}
                value={user.username}
                placeholder="Name"
            />


            <input
                type="text"
                name="bio"
                onChange={changeHandler}
                value={user.bio}
                placeholder="Bio"
            />

            <p className="required-message">All fields are required.</p>


            <button className='update-btn'>
                {
                    loading ? 'Processing...' : 'Change'
                }
            </button>


        </form>
    )
}
