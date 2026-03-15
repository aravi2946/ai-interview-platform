import {OAuth2Client} from "google-auth-library"
import User from "../models/User.js";
import jwt from "jsonwebtoken"
import { ENV } from "../lib/env.js";


const client = new OAuth2Client(ENV.GOOGLE_CLIENT_ID)
const authController = async (req, res) => {
    
    const { credential } = req.body;
    try {
        const ticket = await client.verifyIdToken({
            idToken: credential,
            audience:ENV.GOOGLE_CLIENT_ID
        })
        const { sub: googleId, email, name, picture } = ticket.getPayload()
        
        const user = await User.findOne({ email })
        if (!user)
            user = await User.create({ name, email, googleId, avatar: picture })
        
        const token = jwt.sign({ userId: user._id }, ENV.JWT_SECRET, {
            expiresIn:'7d'
        })
        res.status(200).json({token,user:{name:user.name,email:user.email,avatar:user.avatar}})
        
    } catch (err) {
        console.log("Error", err);
        res.status(401).json({msg:"Invalid Google Token"})
        
        
    }
}

export default authController