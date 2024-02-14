import mongoose from 'mongoose';
import dotenv from 'dotenv';

const { config } = dotenv;


config();

async function dbConnection() {

    try {

        mongoose.connect(process.env.DB_URL);

        console.log('Database connected successfully');

    } catch (e) {

        console.log('Error connecting to database');

    }
}


export default dbConnection;