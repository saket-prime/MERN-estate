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

export const getListings = expressAsyncHandler(async (req, res) => {
    
    const limit = parseInt(req.query.limit) || 9;
    const startIndex = parseInt(req.query.startIndex) || 0;
    let offer = req.query.offer;
    
    if (offer === undefined || offer === 'false'){
        offer = { $in: [false, true]};
    }
    
    let furnished = req.query.furnished;
    
    if (furnished === undefined || furnished === 'false') {
        furnished = { $in: [false, true]};
    }
    
    let parking = req.query.parking;
    
    if (parking === undefined || parking === 'false') {
        parking = { $in: [false, true]};
    }
    
    let type = req.query.type;
    
    if (type === undefined || type === 'all') {
        type = { $in: ["rent", "sell"] };
    }
    
    const searchTerm = req.query.searchTerm || '';
    
    
    const sort = req.query.sort || 'createdAt';
    
    const order = req.query.order || 'desc';
    
    const listings = await Listing.find({
        name: {$regex: searchTerm, $options: 'i'},
        offer,
        furnished,
        parking,
        type,
    }).sort(
        {[sort]: order}
    ).limit(limit).skip(startIndex)
    
    res.status(200).json(listings);
    
})