import jwt from jsonwebtoken;
import BlackListToken from "../models/blackListToken.model.js";

export const authMiddleware = async (req, res, next) => {
    const token = req.cookies.token;
    if (!token) {
        return res.status(401).json({ message: "Token Not found" });
    }

    try {
        const isBlacklisted = await BlackListToken.findOne({ token });
        if (isBlacklisted) {
            return res.status(401).json({ message: "Invalid Token" });
        }
        const decodedToken = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decodedToken;
        next();

    } catch (error) {
        return res.status(401).json({ message: "Internal server Error" });

    }

}