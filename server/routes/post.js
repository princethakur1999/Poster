import express from 'express';

import { createPost, getPosts, deletePost } from './../controllers/post.js';

const router = express.Router();


router.post('/create', createPost);
router.get('/posts', getPosts);
router.delete('/delete-post', deletePost);

export default router;