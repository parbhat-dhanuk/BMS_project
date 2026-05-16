import Blog from "../models/blogs.js";
import User from "../models/users.js";
import logger from "../utils/logger.js";
import { validateBlog } from "../utils/validation/blogValidation.js";

export const addBlog = async (req, res, next) => {
  logger.info("addBlog end point hit...");
  try {
    //validate the schema
    const { error } = validateBlog(req.body);
    if (error) {
      logger.warn("Validation error", error.details[0].message);
      return res.status(400).json({
        success: false,
        message: error.details[0].message,
      });
    }
    const { title, description } = req.body;
    const newBlog = await Blog.create({
      title: req.body.title,
      description: req.body.description,
      userId: req.user.userId,
    });

    logger.info("Blog Created successfully", newBlog.id);

    res.status(201).json({
      success: true,
      message: "Blog Created Successfully",
    });
  } catch (error) {
    logger.error("addBlog error occured", error.message);
    next(error);
  }
};

export const getAllBlogs = async (req, res, next) => {
  logger.info("getAllBlogs end point hit...");
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 6;

    const offset = (page - 1) * limit;

    const { count, rows } = await Blog.findAndCountAll({
      limit,
      offset,
      order: [["createdAt", "DESC"]],
    });

    // const blogs = await Blog.findAll();
    logger.info("All Blogs fetched successfully");

    res.json({
      success: true,
      data: rows,
      totalPages: Math.ceil(count / limit),
      currentPage: page,
    });
  } catch (error) {
    logger.error("getAllBlogs error occured", error.message);
    next(error);
  }
};

export const getSingleBlog = async (req, res, next) => {
  logger.info("getSingleBlog end point hit...");
  try {
    const id = req.params.id;
    if (!id) {
      return res.status(400).json({
        success: false,
        message: "blogId is not provided",
      });
    }
    const blog = await Blog.findByPk(id, {
      include: [
        {
          model: User,
          attributes: ["username"],
        },
      ],
    });
    if (!blog) {
      return res.status(404).json({
        success: false,
        message: "Blog is not available",
      });
    }
    logger.info("Blog fetched successfully");

    res.json({
      success: true,
      blog,
    });
  } catch (error) {
    logger.error("getAllBlogs error occured", error.message);
    next(error);
  }
};

export const getMyBlogs = async (req, res, next) => {
  logger.info("getMyBlogs end point hit...");
  try {
    const id = req.user.userId;

    if (!id) {
      return res.status(400).json({
        success: false,
        message: "userId is not provided",
      });
    }

    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 6;
    const offset = (page - 1) * limit;

    const { count, rows } = await Blog.findAndCountAll({
      where: {
        userId: id,
      },
      limit,
      offset,
      order: [["createdAt", "DESC"]],
    });

    logger.info("Blogs fetched successfully");

    res.json({
      success: true,
      data: rows,
      totalPages: Math.ceil(count / limit),
      currentPage: page,
    });
  } catch (error) {
    logger.error("getMyBlogs error occured", error.message);
    next(error);
  }
};

export const updateBlog = async (req, res, next) => {
  logger.info("updateBlog end point hit...");
  try {
    const id = req.params.id;
    if (!id) {
      return res.status(400).json({
        success: false,
        message: "blogId is not provided",
      });
    }

    const blog = await Blog.findOne({
      where: {
        id,
      },
    });
    if (!blog) {
      return res.status(404).json({
        success: false,
        message: "Blog is not available",
      });
    }

    const isOwner = blog.userId === req.user.userId;
    const isAdmin = req.user.roleCode === "admin";

    if (!isOwner && !isAdmin) {
      return res.status(403).json({
        success: false,
        message: "Not allowed to update this blog",
      });
    }

    await blog.update(req.body);
    logger.info("Blog updated successfully");

    res.json({
      success: true,
      blog,
      message: "Blog Updated Successfully",
    });
  } catch (error) {
    logger.error("updateBlog error occured", error.message);
    next(error);
  }
};

export const deleteBlog = async (req, res, next) => {
  logger.info("deleteBlog end point hit...");
  try {
    const id = req.params.id;
    if (!id) {
      return res.status(400).json({
        success: false,
        message: "blogId is not provided",
      });
    }
    const blog = await Blog.findOne({
      where: {
        id,
      },
    });
    if (!blog) {
      return res.status(404).json({
        success: false,
        message: "Blog is not available",
      });
    }

    const isOwner = blog.userId === req.user.userId;
    const isAdmin = req.user.roleCode === "admin";

    if (!isOwner && !isAdmin) {
      return res.status(403).json({
        success: false,
        message: "Not allowed to delete this blog",
      });
    }
    await blog.destroy();
    logger.info("Blog deleted successfully");

    res.json({
      success: true,
      message: "Blog deleted Successfully",
    });
  } catch (error) {
    logger.error("deleteBlog error occured", error.message);
    next(error);
  }
};
