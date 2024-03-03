import express from 'express'
import { deleteUser, updateUser, userListings } from '../controllers/user.controller.js';
import { verifyToken } from '../middlewares/verifyUser.js';

const router = express.Router();

router.post('/update/:id', verifyToken, updateUser);
router.delete('/delete/:id', verifyToken, deleteUser);
router.get('/listings/:id', verifyToken, userListings);

export default router;