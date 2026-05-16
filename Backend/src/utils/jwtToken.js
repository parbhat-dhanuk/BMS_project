import jwt from 'jsonwebtoken'
import dotenv from "dotenv";
dotenv.config()

const generateAccessToken=(payload)=>{
return jwt.sign(payload, process.env.ACCESS_TOKEN_SECRET, {
      expiresIn: '1d',
    })
}

const generateRefreshToken=(payload)=>{
return jwt.sign(payload, process.env.REFRESH_TOKEN_SECRET, {
      expiresIn: '7d',
    })
}

export {generateAccessToken,generateRefreshToken} 