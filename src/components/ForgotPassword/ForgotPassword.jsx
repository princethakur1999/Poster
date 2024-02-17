import './ForgotPassword.css';

import { useState } from "react";

import { useNavigate } from 'react-router-dom';

import axios from "axios";

import { toast } from 'react-hot-toast';

// const BACKEND = "http://localhost:4000";

const BACKEND = import.meta.env.VITE_REACT_APP_API_URL;



export default function ForgotPassword() {


    const navigate = useNavigate();



    const [email, setEmail] = useState("");

    const [otp, setOtp] = useState("");

    const [passwords, setPasswords] = useState({ newPassword: "", confirmNewPassword: "" });

    const [loading, setLoading] = useState(false);

    const [otpSent, setOtpSent] = useState(false);

    const [emailVerified, setEmailVerified] = useState(false);

    const sendOtp = async () => {

        try {

            setLoading(true);

            const response = await axios.post(`${BACKEND}/send-otp-for-email-verification`, { email });

            if (!response.data.success) {

                throw new Error(" Something went wrong while sending the OTP.");
            }

            toast.success(`OTP has been sent`);


            setOtpSent(true)

        } catch (e) {

            console.log(e);
        }
        finally {

            setLoading(false);
        }
    }

    const verifyEmail = async () => {

        try {

            setLoading(true);

            const response = await axios.post(`${BACKEND}/verify-email/${email}`, { otp });

            if (!response.data.success) {

                throw new Error("Something went wrong while verifying the OTP.");
            }

            toast.success("Email Verified Successfully!");

            setEmailVerified(true);

        } catch (e) {

            console.log(e);

        } finally {

            setLoading(false);
        }
    };


    const changeHandler = (e) => {

        setPasswords((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    };

    const submitHandler = async (e) => {

        e.preventDefault();

        try {
            setLoading(true);

            const response = await axios.post(`${BACKEND}/change-password/${email}`, passwords);

            if (!response.data.success) {

                throw new Error("Password does not match or is too short");
            }

            alert('Your password has been changed successfully!');

            navigate("login");


        } catch (e) {

            console.log(e);
        }
        finally {

            setLoading(false);
        }

    };

    return (

        <div className="forgotPassword">

            <h2>Forgot Password?</h2>

            <form onSubmit={submitHandler} autocomplete="off">

                {
                    !otpSent && !emailVerified &&
                    (
                        <>
                            <input
                                type="text"
                                placeholder="Enter Your Email"
                                name="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                            />
                            <button className='sendOtpBtn' type="button" onClick={sendOtp}>
                                {
                                    loading ? "Please wait.." : "Send OTP"
                                }
                            </button>
                        </>
                    )
                }

                {
                    otpSent && !emailVerified &&
                    (
                        <>
                            <input
                                type="text"
                                placeholder="OTP"
                                name="otp"
                                value={otp || ""}
                                onChange={(e) => setOtp(e.target.value)}
                            />
                            <button className='verifyBtn' type="button" onClick={verifyEmail}>
                                {
                                    loading ? "Please wait.." : "Verify OTP"
                                }
                            </button>
                        </>
                    )
                }


                {
                    otpSent && emailVerified &&
                    (
                        <>
                            <input
                                type="password"
                                placeholder="New Password"
                                name="newPassword"
                                value={passwords.newPassword || ""}
                                onChange={changeHandler}
                            />
                            <input
                                type="password"
                                placeholder="Confirm New password"
                                name="confirmNewPassword"
                                value={passwords.confirmNewPassword || ""}
                                onChange={changeHandler}
                            />
                            <button className="confirmBtn" type="submit">

                                {
                                    loading ? "Processing..." : "Confirm"
                                }
                            </button>
                        </>
                    )
                }
            </form>
        </div>
    );

}
