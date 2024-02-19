import express from 'express';

const router = express.Router();

import { userData,  getOnlineUsers} from './../controllers/user.js';

router.get('/user/:username', userData);
router.get('/online-users',  getOnlineUsers);

export default router;