import User from './../models/user.js';

import { v2 as cloudinary } from 'cloudinary';


export async function getUser(req, res) {

    try {

        const id = req.params.id;

        console.log("id mil gya: ", id);


        if (!id) {

            return res.status(400).json({
                success: false,
                message: 'You must provide an user ID',
            });
        }

        const user = await User.findById(id).populate({ path: 'posts', options: { sort: { createdAt: -1 } } }).exec();

        if (!user) {

            return res.status(404).json({

                success: false,
                message: "No user with that ID"
            });
        }

        console.log("user mil gya: ", user);

        delete user.password;

        return res.status(200).json({

            success: true,
            message: "Information found!",
            user

        });


    } catch (e) {

        return res.status(400).json({

            success: false,
            message: 'Invalid request',
        });
    }
}




export async function changePhoto(req, res) {

    try {

        const photo = req.files && req.files.newPhoto;

        const id = req.body.userId;

        console.log(photo);
        console.log(id);

        if (!id || !photo) {

            return res.status(400).json({

                success: false,
                message: "You must provide a valid file and an ID"
            });
        }

        const user = await User.findOne({ _id: id });

        if (!user) {

            return res.status(404).json({

                success: false,
                message: "User not found."
            });
        }

        console.log(user);

        const cloudinaryRes = await cloudinary.uploader.upload(photo.tempFilePath, { folder: "Poster" });

        const url = cloudinaryRes.secure_url;

        const result = await User.findByIdAndUpdate(id, { $set: { photo: url } }).exec();

        console.log(result);

        if (!result) {

            throw new Error("Failed to update user with the new photo URL.");
        }



        return res.status(200).json({

            success: true,
            message: "The image has been uploaded to the server",
        });

    } catch (e) {

        return res.status(500).json({

            success: false,
            message: `Server error: ${e.message}`,
        });

    }
}


export async function editProfile(req, res) {

    try {

        const id = req.params.id;

        const { username, bio } = req.body;

        if (!id || !username || !bio) {

            return res.status(400).json({

                success: false,
                message: 'Missing fields'
            });
        }


        const user = await User.findOne({ _id: id });

        if (!user) {

            return res.status(404).json({

                success: false,
                message: 'User not found'
            });
        }


        const result = await User.findByIdAndUpdate(id, { $set: { username: username, bio: bio } }, { new: true });

        console.log(result);


        return res.status(200).json({

            success: true,
            message: `Successfully updated profile for ${user.username}`,
            result
        });



    } catch (e) {

        return res.status(500).json({

            success: false,
            message: e.message ? e.message : "Server error"
        });
    }
}