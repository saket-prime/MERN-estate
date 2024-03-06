import express from "express";
import {
    registerUser,
    loginUser,
    google,
    logoutUser
} from '../controllers/auth.controller.js';
import { verifyToken } from "../middlewares/verifyUser.js";

const router = express.Router();

router.post('/register', registerUser);
router.post('/login', loginUser);
router.post('/google', google );
router.get('/signout', logoutUser);

export default router;