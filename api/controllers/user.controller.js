import asyncHandler from 'express-async-handler';
import bcrypt from 'bcrypt';
import User from '../models/user.model.js';
import validator from 'email-validator';
import Listing from "../models/listing.model.js"

export const updateUser = asyncHandler(async (req, res) => {
    
    
     if(req.user.id !== req.params.id){
        res.status(403);
        throw new Error("Forbidden");
     }
     
     if(req.body.password){
        req.body.password = await bcrypt.hash(req.body.password, 10);
     }
     
    if (req.body.email && !validator.validate(req.body.email)) {
        res.status(400);
        throw new Error("Invalid email.");
    }
     
     const updatedUser = await User.findByIdAndUpdate(req.params.id, {
        $set:{
            username: req.body.username,
            email: req.body.email,
            password: req.body.password,
            avatar: req.body.avatar  
        }
    },{new: true});
    
    const {password, ...rest} = updatedUser._doc;
    
    res.status(200).json(rest);
    
})

export const deleteUser = asyncHandler(async (req, res) => {
    if (req.user.id !== req.params.id) {
        res.status(401);
        throw new Error("You can only delete your own account.");
    }
    
    try {
        await User.findByIdAndDelete(req.params.id)
        
        res.status(200).clearCookie('accessToken').json({statusCode: "200", message: "user has been deleted"})
    } catch (error) {
        res.status(500);
        throw new Error('user could not be deleted');
    }
    
    
})

export const userListings = asyncHandler(async (req, res) => {
    
    if(req.user.id === req.params.id){
        const listing = await Listing.find({userRef: req.params.id});
        res.status(200).json(listing);
        if(error) {
            res.status(500);
            res.json('server error');
        }
    }else{
        res.status(401);
        res.json('User can only view your own listing.');
    }
    
})