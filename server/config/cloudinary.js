import cloudinary from 'cloudinary';


import dotenv from 'dotenv';

const { config } = dotenv;

config();


function cloudinaryConnection() {

    try {

        cloudinary.config({

            cloud_name: process.env.CLOUD_NAME,
            api_key: process.env.API_KEY,
            api_secret: process.env.API_SECRET
        });

    } catch (e) {

        console.log('Error in cloudinary connection', e);
    }
}

export default cloudinaryConnection;