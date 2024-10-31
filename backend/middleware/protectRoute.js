import jwt from "jsonwebtoken";
import User from "../models/user.model.js";
import { client } from "../redis/client.js";

const verifyToken = async (req, res, next) => {
    try {
        const payload = await client.get("user");
        if (!payload) {
            return res.status(401).json({ error: "Unauthorized - No User Data in Cache, Login first" });
        }

        const data = JSON.parse(payload);
        const token = data.token //fetching current jwt token
        if (!token) {
            return res.status(401).json({ error: "Unauthorized - No Token Provided" });
        }

        const decodedUser = jwt.verify(token, process.env.JWT_SECRET);
        if (!decodedUser) {
            return res.status(401).json({ error: "Unauthorized - Invalid Token" });
        }

        const user = await User.findById(decodedUser.userId).select("-password"); //logged in user
        if (!user) {
            return res.status(404).json({ error: "User Not Found!" });
        }

        req.user = user;
        next();
    } catch (err) {
        console.log("Error in protectRoute middleware", err.message);
        res.status(500).json({ error: "Internal Server Error" });
    }
}

export default verifyToken;