import express from "express";
import {
    registerUser,
    loginUser,
    google
} from '../controllers/auth.Controller.js';
import { verifyToken } from "../middlewares/verifyUser.js";

const router = express.Router();

router.post('/register', registerUser);
router.post('/login', loginUser);
router.post('/google', google );

export default router;