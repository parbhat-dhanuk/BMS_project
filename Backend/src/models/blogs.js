import { DataTypes } from "sequelize";
import { sequelize } from "../config/db.js";

const Blog = sequelize.define(
  "Blog",
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    title: {
      type: DataTypes.STRING,
      allowNull: false,
    },

    description: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
  },
  {
    freezeTableName: true, // j model name xa teii table ko name banauxa database ma
    timestamps: true,
  },
);

export default Blog;
