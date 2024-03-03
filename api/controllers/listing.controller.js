import expressAsyncHandler from "express-async-handler";
import Listing from "../models/listing.model.js"

export const createListing = expressAsyncHandler(async (req, res) => {
    
    try {
        
        const listing = await Listing.create(req.body);
        res.status(201).json(listing);
        
    } catch (error) {
        res.status(400);
        throw new Error(error);
    }
    
    
})