import Post from './../models/post.js';
import User from './../models/user.js';

import { v2 as cloudinary } from 'cloudinary';

import dotenv from 'dotenv';

const { config } = dotenv;

config();

export async function createPost(req, res) {

    try {

        let { description } = req.body;

        let file = req.files.img;

        let additionalData = req.body.additionalData ? JSON.parse(req.body.additionalData) : {};


        if (!description || !file) {

            return res.status(400).json({

                success: false,
                message: "Please provide all the fields"
            });
        }

        // Find user present or not 
        const user = await User.findOne({ _id: additionalData.userId });

        // Throw an error if the user was not found in the database
        if (!user) {

            return res.status(401).json({

                success: false,
                message: "User not found"
            });
        }

        // Upload the file to Cloudinary

        const options = { folder: process.env.FOLDER_NAME };

        const cloudinaryFile = await cloudinary.uploader.upload(file.tempFilePath, options);



        // Create a new post with the Cloudinary URL
        const post = new Post({

            description: description,
            image: cloudinaryFile.secure_url,
            user: user._id
        });

        // Save the post to the database
        const savedPost = await post.save();

        // Update the user's posts array in a single operation
        const updatedUser = await User.findByIdAndUpdate(user._id, { $push: { posts: savedPost._id } }, { new: true });

        if (!updatedUser) {

            return res.status(404).json({

                success: false,
                message: 'User not found for update'
            });
        }


        return res.status(200).json({

            success: true,
            message: "Post created successfully",
            data: post
        });


    } catch (error) {

        console.log('Error in creating post: ', error);

        // Handle specific error cases if needed
        if (error.name === 'SomeSpecificError') {

            return res.status(500).json({

                success: false,
                message: 'Specific error occurred'
            });
        }

        return res.status(500).json({

            success: false,
            message: 'Server error'
        });
    }
}

export async function getPosts(req, res) {

    try {

        const posts = await Post.find().sort({ createdAt: -1 }).populate('user', '-password').exec();

        if (!posts) {

            return res.status(400).json({

                success: false,
                message: "Posts not found"
            });
        }

        console.log("posts: ", posts);

        for (let i = 0; i < posts.length; i++) {

            delete posts[i].user.password;
        }

        console.log("posts: ", posts);

        return res.status(200).json({

            success: true,
            message: 'Get all posts successfully',
            posts
        });

    } catch (e) {


        console.error(e);

        return res.status(500).json({

            success: false,
            message: 'Server Error while getting the posts'
        });

    }
}



export async function deletePost(req, res) {

    try {

        const { username, postid } = req.body;

        if (!username || !postid) {

            return res.status(400).json({

                success: false,
                message: "Username or Post ID is missing",
            });
        }

        const user = await User.findOne({ username: username });

        // Check whether the user exists
        if (!user) {

            return res.status(400).json({

                success: false,
                message: `User with username "${username}" does not exist.`,
            });
        }

        console.log("Before delete: ", user);

        await Post.deleteOne({ "_id": postid });

        user.posts.pull({ _id: postid });

        const result = await user.save();

        console.log("After delete: ", result);

        return res.status(200).json({

            success: true,
            message: 'Delete Successful',
        });

    } catch (e) {

        console.log(e);

        return res.status(500).json({

            success: false,
            message: e.message,
        });
    }
}
