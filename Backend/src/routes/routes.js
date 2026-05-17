import express from "express";
import {
  getCurrentUser,
  loginUser,
  logoutUser,
  registerUser,
} from "../controllers/authController.js";
import verifyAccessToken from "../middleware/verifyAccessToken.js";
import {
  addBlog,
  deleteBlog,
  getAllBlogs,
  getMyBlogs,
  getSingleBlog,
  updateBlog,
} from "../controllers/blogController.js";

const router = express.Router();

//auth routes
router.post("/auth/register", registerUser);
router.post("/auth/login", loginUser);
router.post("/auth/logout", logoutUser);

router.use(verifyAccessToken);
router.get("/auth/me", getCurrentUser);

//blogs routes
router.post("/blog", addBlog);
router.get("/blog", getAllBlogs);
router.get("/blog/me", getMyBlogs);
router.get("/blog/:id", getSingleBlog);
router.patch("/blog/:id", updateBlog);
router.delete("/blog/:id", deleteBlog);

export default router;
