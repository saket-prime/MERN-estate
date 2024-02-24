import asyncHandler from 'express-async-handler';
import User from '../models/userModel.js';
import validator from 'email-validator';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken'

// register
// api/user/register
// public

export const registerUser = asyncHandler( async (req, res) =>{
    
    const { username, email, password } = req.body;
    
    if(!username || !email || !password ) {
        res.status(400);
        throw new Error("All fields are mandatory");
    }
    
    if (!validator.validate(email)) {
        res.status(400);
        throw new Error("Invalid email.");
    }

    const userAvailable = await User.findOne({email});
    
    if (userAvailable){
        res.status(400);
        throw new Error("user already exists");
        
    }
    const hashPassword = await bcrypt.hash(password, 10);
    const user = await User.create({username, email, password: hashPassword})
    
    if(user){
        res.status(201).json({ _id: user.id, email: user.email });
    } else {
        res.status(400);
        throw new Error('Resource not created');
    }
    
});

// login
// api/user/login
// public

export const loginUser = asyncHandler(async (req, res) => {
    const {email, password} = req.body;
    if(!email || !password) {
        res.status(400);
        throw new Error('All fields are mandatory.');
    }
    
    const user = await User.findOne({email});
    
    if(!user) {
        res.status(404);
        throw new Error("User not found");
    }
    
    if(user && (await bcrypt.compare(password, user.password))){
        
        const accessToken = jwt.sign({
            user: {
                username: user.username,
                email:user.email,
                id:user.id
            }}, process.env.SECRET_KEY, {expiresIn: '1d'}
        )
        
        res.status(200).json(accessToken);
    } else {
        res.status(403);
        throw new Error("Invalid credentials");
        
    }
    
})
