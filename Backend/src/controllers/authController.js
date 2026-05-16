import logger from "../utils/logger.js";
import bcrypt from "bcryptjs";
import {
  validateLogin,
  validateRegistration,
} from "../utils/validation/authValidation.js";
import User from "../models/users.js";
import { sequelize } from "../config/db.js";
import {
  generateAccessToken,
  generateRefreshToken,
} from "../utils/jwtToken.js";
import jwt from "jsonwebtoken";
import Role from "../models/role.js";
//user registration

const registerUser = async (req, res, next) => {
  logger.info("Register end point hit...");
  try {
    //validate the schema
    const { error } = validateRegistration(req.body);
    if (error) {
      logger.warn("Validation error", error.details[0].message);
      return res.status(400).json({
        success: false,
        message: error.details[0].message,
      });
    }
    const { email, username, password } = req.body;
    const user = await User.findOne({ where: { email } });
    if (user) {
      logger.warn("Email already exist");
      return res.status(400).json({
        success: false,
        message: "Email already exist",
      });
    }
    const hashPassword = await bcrypt.hash(password,12);
    const role=await Role.findOne({
      where:{
        roleCode:"user"
      }
    })
    logger.info("Role get successfully", role.id);
    const newUser = await User.create({
      email,
      username,
      password: hashPassword,
      roleId:role.id
    });
    logger.info("User Saved successfully", newUser.id);

    res.status(201).json({
      success: true,
      message: "User Registered Successfully",
    });
  } catch (error) {
    logger.error("Registration error occured", error.message);
    next(error);
  }
};

//user login

const loginUser = async (req, res, next) => {
  logger.info("Login end point hit ...");
  try {
    const { error } = validateLogin(req.body);
    if (error) {
      logger.warn("Validation error", error.details[0].message);
      return res.status(400).json({
        success: false,
        message: error.details[0].message,
      });
    }

    const { email, password } = req.body;
    const user = await User.findOne({ where: { email } });
    if (!user) {
      logger.warn("Invalid Email");
      return res.status(400).json({
        success: false,
        message: "Invalid Credentials",
      });
    }

    //valid password or not
    const isValidPassword = await bcrypt.compare(password,user.password);
    if (!isValidPassword) {
      logger.warn("Invalid Password");
      return res.status(400).json({
        success: false,
        message: "Invalid credentials",
      });
    }
    const role=await Role.findOne({where:{
      id:user.roleId
    }})
    if(!role){
       return res.status(400).json({
        success: false,
        message: "Role is not Assigned",
      });
    }
    const payload = {
      userId: user.id,
      username: user.username,
      roleCode:role.roleCode
    };
    const accessToken = generateAccessToken(payload);
  
    // Set cookies
    res.cookie("accessToken", accessToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      maxAge: 24 * 60 * 60 * 1000, //1 day
    });

    return res.json({
      success: true,
      message: "Login successfully",
      userId: user.id,
      email: user.email,
      accessToken,
    });
      
  } catch (error) {
    logger.error("Login error occured", error.message);
    next(error);
  }
};

//logout

const logoutUser = async (req, res, next) => {
  logger.info("Logout end point hit...");
  try {
    res.clearCookie("accessToken");
    
    res.status(200).json({
      success: true,
      message: "Logged out successfully!",
    });
  } catch (error) {
    logger.error("Error while logging out", error.message);
    next(error);
  }
};

//me

const getCurrentUser = async (req, res, next) => {
    logger.info("getCurrentUser end point hit...");
  try {
    const id=req.user.userId;
    const user = await User.findByPk(id, {
      attributes: ["id", "username", "email"],
       include: [
    {
      model: Role,
      attributes: ["roleCode"],
    },
  ],
    });

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    return res.json({
      success: true,
      user,
    });
  } catch (error) {
    logger.error("Error while getCurrentUser", error.message);
    next(error);
  }
};

export { registerUser, loginUser, logoutUser, getCurrentUser };
