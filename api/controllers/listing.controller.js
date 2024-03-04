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
export const deleteListing = expressAsyncHandler(async (req, res) => {
    
    const listing = await Listing.findById(req.params.id);
    if(!listing){
        res.status(404);
        res.json('Listing not found')
    }
    
    if(req.user.id !== listing.userRef){
        res.status(401);
        res.json('You can only delete your own listing.')
    }
    
    try {
        await Listing.findByIdAndDelete(req.params.id);
        res.status(201).json('listing has been deleted');
        
    } catch (error) {
        res.status(400);
        throw new Error(error);
    }
    
    
})

export const updateListing = expressAsyncHandler(async (req, res) => {
    
    const listing = await Listing.findById(req.params.id);
    
    if(req.user.id !== listing.userRef){
        res.status(401);
        res.json('You can only update your own listings.')
    }
    
    const updatedListing = await Listing.findByIdAndUpdate(
        req.params.id,
        req.body,
        {new: true}
    );
    
    res.status(200).json(updatedListing);
    
})

export const getListing = expressAsyncHandler(async (req, res) => {

    const listing = await Listing.findById(req.params.id);

    res.status(200).json(listing);

})