import mongoose from "mongoose";

const postSchema = mongoose.Schema(
    {

        description: {
            type: String,
            required: true,
            maxLength: 100
        },
        image: {
            type: String,
            required: true
        },
        user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User"
        },
        date: {
            type: Date,
            default: Date.now
        }
    },
    {
        timestamps: true
    }
);

const Post = mongoose.model("Post", postSchema);

export default Post;
