import User from "../model/authSchema.js"
import jwt from 'jsonwebtoken'

export const verifyToken = async (req, res, next) => {
    try {
        if(req.headers.authorization && req.headers.authorization.startsWith("Bearer")){
            const token = req.headers.authorization.split(" ")[1];
            const decoded = jwt.verify(token,process.env.SECRET);
            const user  = await User.findById(decoded.id).select("name email")
            req.user = user;
            next();
        } else {
            res.status(401).json({message: "Not authorized,no token"})
        }
    } catch (error) {
        console.error("auth error : ", error.message);
        res.status(500).json({message: "Token invalid or expired"})
    }
}