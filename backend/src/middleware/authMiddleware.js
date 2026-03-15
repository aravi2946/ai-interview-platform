import jwt from "jsonwebtoken"
import { ENV } from "../lib/env"
const authMiddleware = (req,res,next) => {
    const token = req.headers.authorization?.split(" ")[1]
    if (!token)
        res.status(401).json({ msg: "Login to Continue" })
    try {
        const decode = jwt.verify(token, ENV.JWT_SECRET)
        req.userId = decode.userId;
        next();
    } catch (err) {
        res.status(401).json({msg:"Invalid token"})
    }

}


export default authMiddleware;
