import jwt from 'jsonwebtoken';

export const verifyToken = (req, res, next) => {
    
        const token = req.cookies.accessToken;

        if (!token) {
            res.status(401);
            throw new Error("Unauthorized");
        }

        jwt.verify(token, process.env.SECRET_KEY, (err, user) => {
            if (err) {
                res.status(403);
                throw new Error('forbidden');
            }
            req.user = user.user;
            next();
        })
}