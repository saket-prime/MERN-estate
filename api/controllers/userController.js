import asyncHandler from 'express-async-handler';
import User from './userController';
import validator from 'email-validator';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken'

// register
// api/users/register
// public

export const regiterUser = asyncHandler( async (req, res) =>{
    
    const { username, email, password } = req.body;
    if(!username || !email || !password ) {
        res.statusCode(400);
        throw new error("All fields are mandatory");
    }
    if (!validator.validate(email)) {
        res.statusCode(400);
        throw new error("Invalid email.");
    }
    const userAvailable = User.findOne({email});
    if (userAvailable){
        res.status(400);
        throw new error("user already exists");
    }
    
    const hashPassword = await bcrypt.hash(password, 10);
    const user = User.create({username, email, password: hashPassword})
    
    if(user){
        res.status(200);
        res.json({_id:user.id, email: user.email});
    } else {
        res.status(400);
        throw new error('Resource not created');
    }
    
});

// login
// api/users/login
// public

export const loginUser = asyncHandler(async (req, res) => {
    const {email, password} = req.body;
    if(!email || !password) {
        res.status(400);
        throw new error('All fields are mandatory.');
    }
    
    const user = User.findOne({email});
    
    if(!user) {
        res.status(404);
        throw new error("User not found");
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
        throw new error("Invalid credentials");
        
    }
    
})
