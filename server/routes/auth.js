import express from 'express';

import { otp, signup, login, sendOtpForEmailVerification, verifyEmail, changePassword } from '../controllers/auth.js';


const router = express.Router();

router.post('/otp', otp);
router.post('/signup', signup);
router.post('/login', login);
router.post('/send-otp-for-email-verification', sendOtpForEmailVerification);
router.post('/verify-email/:email', verifyEmail);
router.post('/change-password/:email', changePassword);


export default router;
