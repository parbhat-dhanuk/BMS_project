import React from "react";
import { useNavigate } from "react-router-dom";

const BlogCard = ({ data }) => {
  const navigate = useNavigate();
  return (
    <div className="border rounded-xl p-5 hover:shadow-sm transition">
      <h3 className="font-semibold text-lg">
        {data.title.length > 40 ? data.title.slice(0, 40) : data.title}
      </h3>
      <p  className="text-gray-500 text-sm mt-2 break-all">
        {data?.description?.length > 100
          ? data.description.slice(0, 100) + "..."
          : data.description}
      </p>
      <button
        onClick={() => navigate(`/blog/${data.id}`)}
        className="text-blue-600 text-sm mt-3 hover:underline"
      >
        Read More →
      </button>
    </div>
  );
};

export default BlogCard;
