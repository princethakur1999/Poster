import './Login.css';

import { useState } from "react";

import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';


import axios from 'axios';

import { Link } from 'react-router-dom';

import { setMe } from './../../slices/authSlice.js';
import { setToken } from './../../slices/authSlice.js';

import { toast } from 'react-hot-toast';


// const BACKEND = "http://localhost:4000";

const BACKEND = import.meta.env.VITE_REACT_APP_API_URL;


export default function Login() {



    const navigate = useNavigate();
    const dispatch = useDispatch();


    const [loginDetails, setLoginDetails] = useState({ email: "", password: "" });

    const [loading, setLoading] = useState(false);

    function changeHandler(e) {

        const { name, value } = e.target;


        setLoginDetails((prev) => ({ ...prev, [name]: value }));

    }

    async function submitHandler(e) {

        e.preventDefault();



        try {

            setLoading(true);

            const response = await axios.post(`${BACKEND}/login`, loginDetails);

            if (!response.data.success) {

                throw new Error('Login failed!');
            }


            toast.success(response.data.message);



            // Save the me and token to localStorage
            localStorage.setItem('me', JSON.stringify(response.data.me));

            localStorage.setItem('token', response.data.token);



            // Save the me and token to redux store
            dispatch(setMe(response.data.me));

            dispatch(setToken(response.data.token));


            navigate('/profile');


        } catch (e) {

            console.log(e);

            toast.error("Something went wrong!")
        }
        finally {

            setLoading(false);
        }

    }




    return (

        <div className='login'>

            <h2>Login</h2>


            <form onSubmit={submitHandler}>

                <input
                    type="text"
                    placeholder='Email'
                    id="email"
                    name="email"
                    value={loginDetails.email}
                    onChange={changeHandler}
                />

                <input
                    type="password"
                    placeholder='Password'
                    id="password"
                    name="password"
                    value={loginDetails.password}
                    onChange={changeHandler}
                />

                <Link to="/forgot-password" className='forgot-password'>forgot password?</Link>

                <button className='loginBtn'>
                    {
                        loading ? "Processing..." : "Login"
                    }
                </button>

                <Link className='go-to-signup' to="/signup">
                    Signup
                </Link>
            </form>


        </div>
    )
}
