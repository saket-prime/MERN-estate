import express from "express";
import {
    registerUser,
    loginUser
} from '../controllers/authController.js';

const router = express.Router();

router.post('/register', registerUser);
router.post('/login', loginUser);
// router.get('/current', currentUser );

export default router;