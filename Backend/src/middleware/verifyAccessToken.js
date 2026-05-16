import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import logger from "../utils/logger.js";
dotenv.config();

const verifyAccessToken = (req, res, next) => {
  const accessToken = req.cookies.accessToken;
  if (!accessToken) {
    return res.status(401).json({ message: 'No token provided' });
  }

  try {
    const decoded = jwt.verify(accessToken, process.env.ACCESS_TOKEN_SECRET);
    req.user = decoded;
   
    next();
  } catch (error) {
    logger.warn("Token verification failed:", error.message);
    return res.status(401).json({ message: 'Invalid token' });
  }
};

export default verifyAccessToken;