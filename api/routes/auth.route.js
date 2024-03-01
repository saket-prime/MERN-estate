import express from "express";
import {
    registerUser,
    loginUser,
    google
} from '../controllers/auth.Controller.js';

const router = express.Router();

router.post('/register', registerUser);
router.post('/login', loginUser);
router.post('/google', google );

export default router;