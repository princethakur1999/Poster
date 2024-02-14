import './Otp.css';

import { useState } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import axios from 'axios';

import { toast } from 'react-hot-toast';


// const BACKEND = "http://localhost:4000";


const BACKEND = import.meta.env.VITE_REACT_APP_API_URL;


export default function Otp() {

    const navigate = useNavigate();

    const signupData = useSelector((state) => state.auth.signupData);

    const [otp, setOtp] = useState(null);

    const [loading, setLoading] = useState(false);


    function changeHandler(e) {

        setOtp(e.target.value);
    }

    async function submitHandler(e) {

        e.preventDefault();

        try {

            setLoading(true);

            const updatedSignupData = { ...signupData, otp };

            const formData = new FormData();

            formData.append("username", updatedSignupData.username);
            formData.append("email", updatedSignupData.email);
            formData.append("photo", updatedSignupData.photo);
            formData.append("password", updatedSignupData.password);
            formData.append("otp", updatedSignupData.otp);

            const response = await axios.post(`${BACKEND}/signup`, formData, {

                headers: { 'Content-Type': 'multipart/form-data' },
            });

            if (!response.data.success) {

                throw new Error("Signup API failed");
            }

            toast.success("Signup successful");

            navigate('/login');

        } catch (e) {

            console.error("Signup API error:", e);

            toast.error("Something went wrong!");
        }
        finally {

            setLoading(false);
        }

    }

    return (

        <div className='otp-container'>

            <form onSubmit={submitHandler} className='otp-form'>

                <input
                    type="password"
                    placeholder='Enter OTP'
                    name='otp'
                    id='otp'
                    value={otp || ''}
                    onChange={changeHandler}
                />

                <button className='verify-btn'>
                    {
                        loading ? 'Verifying...' : 'Verify'
                    }
                </button>
            </form>
        </div>
    );
}
