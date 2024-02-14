import express from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import fileUpload from 'express-fileupload';
import dotenv from 'dotenv';
import dbConnection from './config/db.js';
import cloudinaryConnection from './config/cloudinary.js';


const app = express();

const { config } = dotenv;

config();

const PORT = process.env.PORT || 4000;





// Enable CORS for all routes
app.use(cors({
    origin: "*",
    credentials: true
}));




// Enable file upload middleware
app.use(fileUpload({
    useTempFiles: true,
    tempFileDir: '/tmp/'
}));




// Middleware to parse JSON in the request body
app.use(express.json());



// Used for handling cookies in HTTP requests and responses.
app.use(cookieParser());





// Database connection
dbConnection();


// Cloudinary connection
cloudinaryConnection();




import auth from './routes/auth.js';
import post from './routes/post.js';
import profile from './routes/profile.js';
import user from './routes/user.js';

// Routes
app.use('/', auth);
app.use('/', post);
app.use('/', profile);
app.use('/', user);


// Default route
app.get('/', (req, res) => {

    return res.json({

        success: true,
        message: 'Your server is up and running.',
    });
});

app.listen(PORT, () => {

    console.log(`Server listening on port ${PORT}`);

});