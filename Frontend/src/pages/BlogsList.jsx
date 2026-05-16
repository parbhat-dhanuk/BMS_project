import { useEffect, useState } from "react";
import BlogCard from "../component/BlogCard";
import axiosInstance from "../api/axiosInstance";
import Spinner from "../component/common/Spinner";
import { ChevronLeft, ChevronRight } from "lucide-react";

const BlogsList = () => {
  const [blogs, setBlogs] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [loading, setLoading] = useState(true);

  const getAllBlogs = async () => {
    try {
      setLoading(true);
      const response = await axiosInstance.get(`/blog?page=${currentPage}&limit=6`);
      if (response.data.success) {
        setBlogs(response.data.data);
        setTotalPages(response.data.totalPages);
      }
    } catch (error) {
      console.log(error.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getAllBlogs();
  }, [currentPage]);

  if (loading) return <Spinner />;

  return (
    <div className="max-w-5xl mx-auto px-6 py-10 space-y-8">

      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white tracking-tight">
            Latest blogs
          </h1>
          <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
           {totalPages === 0 ? " " : `Page ${currentPage} of ${totalPages}`}
          </p>
        </div>
        <span className="text-xs font-medium text-blue-500 bg-blue-50 dark:bg-blue-950/40 px-3 py-1 rounded-full">
          {totalPages} pages total
        </span>
      </div>

      {/* Grid */}
      {blogs.length > 0 ? (
        <div className="grid md:grid-cols-2 gap-5">
          {blogs.map((blog) => (
            <BlogCard key={blog.id} data={blog} />
          ))}
        </div>
      ) : (
        <div className="text-center py-20 text-gray-400 dark:text-gray-600">
          <p className="text-sm">No blogs found.</p>
        </div>
      )}

      {/* Pagination */}
      <div className="flex items-center justify-center gap-3 pt-4 border-t border-gray-100 dark:border-gray-800">
        <button
          onClick={() => setCurrentPage((p) => p - 1)}
          disabled={currentPage <= 1}
          className="flex items-center gap-1.5 px-4 py-2 text-sm font-medium text-gray-700 dark:text-gray-300 border border-gray-200 dark:border-gray-700 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
        >
          <ChevronLeft size={15} />
          Prev
        </button>

        <div className="flex items-center gap-1">
          {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
            <button
              key={page}
              onClick={() => setCurrentPage(page)}
              className={`w-9 h-9 text-sm rounded-lg font-medium transition-colors ${
                page === currentPage
                  ? "bg-blue-500 text-white"
                  : "text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800"
              }`}
            >
              {page}
            </button>
          ))}
        </div>

        <button
          onClick={() => setCurrentPage((p) => p + 1)}
          disabled={currentPage >= totalPages}
          className="flex items-center gap-1.5 px-4 py-2 text-sm font-medium text-gray-700 dark:text-gray-300 border border-gray-200 dark:border-gray-700 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
        >
          Next
          <ChevronRight size={15} />
        </button>
      </div>

    </div>
  );
};

export default BlogsList;