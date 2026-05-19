import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axiosInstance from "../api/axiosInstance";
import Spinner from "../component/common/Spinner";
import { ArrowLeft, Calendar, User, Pencil, Trash2 } from "lucide-react";
import { toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import { deleteBlog, getSingleBlog } from "../features/blogSlice";

const BlogDetails = () => {
  const { id } = useParams();
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const navigate = useNavigate();
  const {loading,user}=useSelector(state=>state.auth)
  const {blog}=useSelector(state=>state.blog)
  const blogData=blog?.blog;
  const dispatch=useDispatch();
  const isOwner = blogData?.userId === user?.id;
  const isAdmin = user?.Role?.roleCode === "admin";

  const getOneBlog = async () => {
    try {
      const response = await dispatch(getSingleBlog(id));
    } catch (error) {
      console.log(error.message);
    }
  };

  const handleDelete = async () => {
    try {
      const response = await dispatch(deleteBlog(id)).unwrap();
        toast.success(response.message);
        navigate(-1);
    } catch (error) {
      toast.error(error);
    } finally {
      setShowDeleteModal(false);
    }
  };

  useEffect(() => {
    getOneBlog();
  }, []);

  if (loading) return <Spinner />;

  if (!blog)
    return (
      <div className="max-w-3xl mx-auto px-6 py-20 text-center">
        <p className="text-gray-400 dark:text-gray-600 text-sm">
          Blog not found.
        </p>
      </div>
    );

  return (
    <div className="max-w-3xl mx-auto px-6 py-10">
      {/* Back */}
      <button
        onClick={() => navigate(-1)}
        className="flex items-center gap-1.5 text-sm text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors mb-8"
      >
        <ArrowLeft size={15} />
        Back to blogs
      </button>

      {/* Article */}
      <article className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-2xl p-8 md:p-10 space-y-6">
        {/* Meta + Actions Row */}
        <div className="flex items-center justify-between gap-4">
          <div className="flex items-center gap-4 text-xs text-gray-400 dark:text-gray-500">
            <span className="flex items-center gap-1.5">
              <User size={12} />
              {blogData?.User?.username}
            </span>

            {blog.createdAt && (
              <span className="flex items-center gap-1.5">
                <Calendar size={12} />
                {new Date(blogData.createdAt).toLocaleDateString("en-US", {
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                })}
              </span>
            )}
          </div>

          {/* Action Buttons */}
          {(isOwner || isAdmin) && (
            <div className="flex items-center gap-2">
              <button
                onClick={() => navigate(`/blog/edit/${id}`)}
                className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-gray-600 dark:text-gray-300 bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 rounded-lg transition-colors"
              >
                <Pencil size={12} />
                Edit
              </button>
              <button
                onClick={() => setShowDeleteModal(true)}
                className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-red-600 dark:text-red-400 bg-red-50 dark:bg-red-900/20 hover:bg-red-100 dark:hover:bg-red-900/40 rounded-lg transition-colors"
              >
                <Trash2 size={12} />
                Delete
              </button>
            </div>
          )}
        </div>

        {/* Title */}
        <h1 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white leading-relaxed wrap-break-word">
          {blogData?.title}
        </h1>

        {/* Divider */}
        <div className="border-t border-gray-100 dark:border-gray-800" />

        {/* Body */}
        <p className="text-gray-600 dark:text-gray-400 leading-relaxed text-base wrap-break-word">
          {blogData?.description}
        </p>
      </article>

      {/* Delete Confirmation Modal */}
      {showDeleteModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm px-4">
          <div className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-2xl p-6 w-full max-w-sm shadow-xl space-y-4">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-red-50 dark:bg-red-900/20 rounded-xl">
                <Trash2 size={18} className="text-red-500" />
              </div>
              <h2 className="text-base font-semibold text-gray-900 dark:text-white">
                Delete blog?
              </h2>
            </div>
            <p className="text-sm text-gray-500 dark:text-gray-400">
              This action cannot be undone. The blog post will be permanently
              removed.
            </p>
            <div className="flex gap-2 pt-1">
              <button
                onClick={() => setShowDeleteModal(false)}
                className="flex-1 px-4 py-2 text-sm font-medium text-gray-600 dark:text-gray-300 bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 rounded-xl transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={handleDelete}
                disabled={loading}
                className="flex-1 px-4 py-2 text-sm font-medium text-white bg-red-500 hover:bg-red-600 disabled:opacity-60 disabled:cursor-not-allowed rounded-xl transition-colors"
              >
                {loading ? "Deleting..." : "Delete"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default BlogDetails;
