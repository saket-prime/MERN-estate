import express from "express";
import { createListing, deleteListing, updateListing, getListing } from "../controllers/listing.controller.js";
import {verifyToken} from '../middlewares/verifyUser.js'

const router = express.Router();

router.post('/create', verifyToken, createListing);
router.delete('/delete/:id', verifyToken, deleteListing);
router.post('/update/:id', verifyToken, updateListing);
router.get('/:id', getListing);


export default router;