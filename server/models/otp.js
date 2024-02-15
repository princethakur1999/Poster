import mongoose from "mongoose";

import emailSneder from './../utils/email.js';

import { generateOtpEmailBody } from './../templates/email.js';


const optSchema = mongoose.Schema(
    {
        email: {
            type: String,
            required: true
        },
        otp: {
            type: Number,
            required: true
        },
        createdAt: {
            type: Date,
            default: Date.now,
            expires: 5 * 60
        }
    }
);




async function sendVerificationEmail(email, otp) {

    try {

        const body = generateOtpEmailBody(otp);

        await emailSneder(email, "Poster", body);

    } catch (e) {

        console.log("Error in sending verification mail[otp.js in models folder]");

    }
}


optSchema.pre('save', function (next) {

    if (this.isNew) {

        sendVerificationEmail(this.email, this.otp);
    }

    next();
});



const OTP = mongoose.model("OTP", optSchema);

export default OTP;