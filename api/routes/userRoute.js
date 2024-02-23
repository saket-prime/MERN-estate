import express from "express";
import {
    regiterUser,
    loginUser
} from '../controllers/userController';

const router = express.Router();

router.post('/register', regiterUser);
router.post('/login', loginUser);
// router.get('/current', currentUser );

export default router;