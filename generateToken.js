import jwt from 'jsonwebtoken';
const generateToken = (user) => {
    return jwt.sign(
        { id: user._id, role: user.role },
        process.env.local.JWT_SECRET,
        { expiresIn: "1h" }
    );
};
export default generateToken;