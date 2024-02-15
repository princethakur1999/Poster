import User from './../models/user.js';
import Otp from './../models/otp.js';

import bcryptjs from 'bcryptjs';
import jwt from 'jsonwebtoken';

import { v2 as cloudinary } from 'cloudinary';

import sendEmail from './../utils/email.js';

import { generateSignupEmailBody } from './../templates/email.js';

export async function otp(req, res) {


    try {

        const { email } = req.body;

        if (!email) {

            return res.status(400).json({

                success: false,
                error: 'Email is required'
            });
        }

        // check if user already exists
        let user = await User.findOne({ email });

        console.log(user);

        if (user) {

            return res.status(400).json({
                success: false,
                error: "User with this email already exists",
            })
        }
        const code = Math.floor(1000 + Math.random() * 9000);

        console.log('code', code);



        // save the OTP to database
        const otp = new Otp({ email, otp: code });

        await otp.save();

        return res.status(200).json({

            success: true,
            message: "Verification Email Sent"
        });


    } catch (e) {

        console.log(e);

        return res.status(500).json({
            success: false,
            error: "Server Error!"
        });
    }


}

export async function signup(req, res) {

    try {

        let { username, email, password, otp } = req.body;

        console.log(username);
        console.log(email);
        console.log(password);
        console.log(otp);

        let photo = req.files.photo;


        console.log(photo);



        if (!username || !email || !password || !otp || !photo) {

            return res.status(400).json({

                success: false,
                message: 'Please provide all fields'
            });
        }


        // Find the most recent OTP stored for the user
        const recentOtp = await Otp.findOne({ email }).sort({ createdAt: -1 }).limit(1);

        console.log("Recent OTP: ", recentOtp);


        // If no OTP is found
        if (!recentOtp) {

            return res.status(400).json({

                success: false,
                message: 'Unable to find OTP'
            });
        }



        // Compare provided OTP with the one in database
        if (otp !== recentOtp.otp.toString()) {

            return res.status(403).send({

                success: false,
                message: "Wrong OTP"
            });
        }



        // hash password
        const salt = await bcryptjs.genSalt(10);

        const newPassword = await bcryptjs.hash(password, salt);


        const options = {

            folder: "Poster"
        }

        const cloudinaryRes = await cloudinary.uploader.upload(photo.tempFilePath, options);

        const user = new User({
            username,
            email,
            photo: cloudinaryRes.secure_url,
            password: newPassword,
            post: {},
        });

        // Save the new user to the database
        await user.save();


        const body = generateSignupEmailBody(username);

        sendEmail(email, 'Signup Successful 🎁', body);

        // Return response
        return res.status(200).json({

            success: true,
            message: 'User registered successfully.',
        });


    } catch (e) {

        console.log('Error : ', e);

        return res.status(500).json({
            success: false,
            message: 'Server Error'
        })

    }


}

export async function login(req, res) {

    try {

        const { email, password } = req.body;

        console.log("email: ", email);
        console.log("password: ", password);


        if (!email || !password) {

            return res.status(400).json({

                success: false,
                message: "Please provide both email and password."
            });
        }

        let user = await User.findOne({ email }).populate("posts").exec();


        // If the user does not exist in the database
        if (!user) {

            return res.status(401).json({

                success: false,
                message: "Authentication failed! User not found."
            });
        }



        // Checking if the provided password is correct or not
        const validPassword = await bcryptjs.compare(password, user.password);

        if (!validPassword) {

            return res.status(401).json({

                success: false,
                message: "Authentication failed! Wrong password."
            });
        }

        const payload = {
            userId: user._id,
            userName: user.username,
            userEmail: user.email
        }


        // Create token
        const token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '7d' })


        // create me
        let me = { userId: user._id };


        // Return token and me
        return res.status(200).json({

            success: true,
            token,
            me,
            user,
            message: "Login successful!"
        });

    } catch (e) {

        console.error("Internal error ocurred while logging in", e);

        return res.status(500).json({
            success: false,
            message: "Internal server error"
        })
    }

}



export async function sendOtpForEmailVerification(req, res) {

    try {

        const { email } = req.body;

        console.log("Lo mil gya email: ", email);

        if (!email) {

            return res.status(400).json({

                success: false,
                message: 'Please provide an email address.'
            })
        }


        const user = await User.findOne({ email: email });

        if (!user) {

            return res.status(400).json({

                success: false,
                message: `This email is not registered.`
            });
        }

        const code = Math.floor(1000 + Math.random() * 9000);


        const otp = new Otp({ email, otp: code });

        await otp.save();


        return res.status(200).json({

            success: true,
            message: 'OTP sent to your email!'
        })

    } catch (e) {

        console.log(e);

        return res.status(500).json({

            success: false,
            message: 'Invalid request'
        });
    }
}

export async function verifyEmail(req, res) {

    try {

        const { email } = req.params;

        const { otp } = req.body;

        console.log(email, otp);


        if (!email || !otp) {

            return res.ststus(400).json({

                success: true,
                message: "Please provide both the email and OTP"
            });
        }

        // Find the most recent OTP stored for the user
        const recentOtp = await Otp.findOne({ email }).sort({ createdAt: -1 }).limit(1);

        console.log("Recent OTP: ", recentOtp);


        // If no OTP is found
        if (!recentOtp) {

            return res.status(400).json({

                success: false,
                message: 'Unable to find OTP'
            });
        }



        // Compare provided OTP with the one in database
        if (otp !== recentOtp.otp.toString()) {

            return res.status(403).send({

                success: false,
                message: "Wrong OTP"
            });
        }

        return res.status(200).json({

            success: true,
            message: "Email Verified!"
        });


    } catch (e) {

        return res.ststus(500).json({

            success: false,
            message: "Server Error! Please try again later."
        });

    }
}


export async function changePassword(req, res) {

    try {

        const { email } = req.params;

        const { newPassword, confirmNewPassword } = req.body;


        console.log("lo sb sahi sahi aa gya: ", email, newPassword, confirmNewPassword);


        if (!email || !newPassword || !confirmNewPassword) {

            return res.status(400).json({

                success: false,
                message: " Fields are missing."
            });
        }

        // Checking if the passwords match
        if (newPassword !== confirmNewPassword) {

            return res.status(400).json({

                success: false,
                message: "The password and its confirmation do not match"
            });
        }

        let user = await User.findOne({ email });

        if (!user) {

            return res.status(400).json({

                success: false,
                message: 'User does not exist'
            });
        }


        // hash password
        const salt = await bcryptjs.genSalt(10);

        const hashedPassword = await bcryptjs.hash(newPassword, salt);

        const result = await User.findByIdAndUpdate(user._id, { $set: { password: hashedPassword } });

        console.log("RESULT: ", result);

        return res.status(200).json({

            success: true,
            message: "Password Changed Successfully!"
        });

    } catch (e) {

        return res.status(500).json({

            success: false,
            message: "Server error!"
        });
    }
}