import express from 'express';

const router = express.Router();

import { userData } from './../controllers/user.js';

router.get('/user/:username', userData);

export default router;