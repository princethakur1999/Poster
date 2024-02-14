import mongoose from 'mongoose';

const userSchema = mongoose.Schema(
    {
        username: {
            type: String,
            required: true,
        },
        email: {
            type: String,
            required: true,
            unique: true,
            lowercase: true,
            trim: true,
        },
        bio: {
            type: String,
            maxlength: 20,
            default: 'Say something...'
        },
        photo: {
            type: String,
            default: "https://www.iconpacks.net/icons/2/free-user-icon-3296-thumb.png"
        },
        password: {
            type: String,
            required: true,
        },
        posts: [{
            type: mongoose.Schema.Types.ObjectId,
            ref: "Post"
        }],
    },
    {
        timestamps: true
    }
);

const User = mongoose.model("User", userSchema);

export default User;
