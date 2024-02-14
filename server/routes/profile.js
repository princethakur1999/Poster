import express from 'express';

const router = express.Router();

import { getUser, changePhoto, editProfile } from '../controllers/profile.js';

router.get('/profile/:id', getUser);
router.post('/change-photo', changePhoto);
router.post('/edit-profile/:id', editProfile);

export default router;