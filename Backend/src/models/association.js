import Blog from "./blogs.js";
import Role from "./role.js";
import User from "./users.js";

Role.hasMany(User, { foreignKey: "roleId" });
User.belongsTo(Role, { foreignKey: "roleId" });


// User has many Blogs
User.hasMany(Blog, {
  foreignKey: "userId",
  onDelete: "CASCADE",
  onUpdate: "CASCADE",
});

// Blog belongs to User
Blog.belongsTo(User, {
  foreignKey: "userId",
});
