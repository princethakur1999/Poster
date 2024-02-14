import './Signup.css';

import axios from 'axios';

import { Link } from 'react-router-dom';

import { useState } from "react";

import { useDispatch } from 'react-redux';

import { setSignupData } from '../../slices/authSlice';

import Otp from './../Otp/Otp.jsx';

import { toast } from 'react-hot-toast';


const BACKEND = "http://localhost:4000";


export default function Signup() {

    const dispatch = useDispatch();

    const [signupDetails, setSignupDetails] = useState({ username: "", email: "", photo: "", password: "" });

    const [isOtpSent, setIsOtpSent] = useState(false);

    const [loading, setLoading] = useState(false);

    function changeHandler(e) {

        const { name, value } = e.target;

        if (name === 'photo') {

            setSignupDetails((prev) => ({ ...prev, [name]: e.target.files[0] }));

        } else {

            setSignupDetails((prev) => ({ ...prev, [name]: value }));
        }
    }


    async function submitHandler(e) {

        e.preventDefault();

        try {

            setLoading(true);

            dispatch(setSignupData(signupDetails));

            const { email } = signupDetails;

            const response = await axios.post(`${BACKEND}/otp`, { email });

            if (!response.data.success) {

                throw new Error('Something went wrong at: localhost:4000/otp!');
            }

            toast.success(`OTP has been sent`);

            setIsOtpSent(true);

        } catch (e) {

            console.error(e);

            toast.error("Something went wrong!");
        }
        finally {

            setLoading(false);
        }

    }

    if (isOtpSent) {

        return <Otp />;

    } else {

        return (

            <div className="signup">

                <h2>Signup</h2>

                <form onSubmit={submitHandler}>

                    <input
                        type="text"
                        placeholder="Username"
                        name="username"
                        id="username"
                        value={signupDetails.username || ''}
                        onChange={changeHandler}
                    />


                    <input
                        type="email"
                        placeholder="Email"
                        name="email"
                        id="email"
                        value={signupDetails.email || ''}
                        onChange={changeHandler}
                    />

                    <input
                        className='photo'
                        type='file'
                        placeholder='Photo'
                        name='photo'
                        onChange={changeHandler}
                    />


                    <input
                        type="password"
                        placeholder="Password"
                        name="password"
                        id="password"
                        value={signupDetails.password || ''}
                        onChange={changeHandler}
                    />
                    <button className='signupBtn' type="submit">
                        {
                            loading ? 'Processing...' : 'Signup'
                        }
                    </button>


                    <Link className='go-to-login' to="/login">
                        Login
                    </Link>

                </form>
            </div>
        );
    }
}