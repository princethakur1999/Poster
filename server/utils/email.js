import nodemailer from 'nodemailer';
import dotenv from 'dotenv';

const { config } = dotenv;

config();

async function emailSender(email, title, body) {


    try {

        const transporter = nodemailer.createTransport({

            host: process.env.MAIL_HOST,
            auth: {
                user: process.env.MAIL_USER,
                pass: process.env.MAIL_PASS
            }

        });

        await transporter.sendMail({

            from: "Poster",
            to: `${email}`,
            subject: `${title}`,
            html: `${body}`

        })

    } catch (e) {

        console.log('Error sending the mail', e);
    }

}


export default emailSender;