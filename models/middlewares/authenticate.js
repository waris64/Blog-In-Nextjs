import jwt from 'jsonwebtoken';
export default function authenticate(req, res, next) {
    const token = req.headers.authorization?.split('')[1];
    if (!token) {
        res.status(401).json({ error: 'Token not found ' })
    }
    try {
        const decode = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decode; // Adding the user details to the user object 
        next();
    } catch (error) {
        console.log('Invalid Token ');
        res.status(403).json({error:'Invalid Token '})
    }
}