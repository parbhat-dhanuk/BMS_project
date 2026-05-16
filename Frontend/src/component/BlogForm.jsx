import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axiosInstance from "../api/axiosInstance";
import { toast } from "react-toastify";
import { PenSquare, ArrowRight, ArrowLeft } from "lucide-react";

const BlogForm = ({ type }) => {
  const [formData, setFormData] = useState({ title: "", description: "" });
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { id } = useParams();
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (loading) return;
    try {
      setLoading(true);
      if (id) {
        const response = await axiosInstance.patch(`/blog/${id}`, formData);
        if (response.data.success) {
          toast.success(response.data.message);
          navigate("/blogs/all");
        }
      } else {
        const response = await axiosInstance.post("/blog", formData);
        if (response.data.success) {
          toast.success(response.data.message);
          navigate("/blogs/all");
        }
      }
    } catch (error) {
      toast.error(error.response?.data?.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (id) {
      getSingleBlog();
    }
  }, [id]);

  const getSingleBlog = async () => {
    try {
      setLoading(true);
      const response = await axiosInstance.get(`/blog/${id}`);
      if (response.data.success) {
        setFormData(response.data.blog);
      }
    } catch (error) {
      console.log(error.message);
    } finally {
      setLoading(false);
    }
  };

  const wordCount = formData.description.trim()
    ? formData.description.trim().split(/\s+/).length
    : 0;

  const charCount = formData.description.length;

  return (
    <div className="min-h-screen px-4 py-16 bg-gray-50 dark:bg-gray-950">
      <div className="w-full max-w-3xl mx-auto">
        {/* Header */}
        <div className="text-center mb-10">
          <div className="inline-flex items-center justify-center w-12 h-12 bg-blue-50 dark:bg-blue-950/40 rounded-2xl mb-5">
            <PenSquare size={20} className="text-blue-500" />
          </div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white tracking-tight mb-2">
            {type === "update" ? "Update blog" : "Write a blog"}
          </h1>
          <p className="text-gray-500 dark:text-gray-400 text-sm">
            Share your thoughts with the world
          </p>
        </div>

        {/* Card */}
        <div className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-2xl p-10">
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Title */}
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
                Title
              </label>
              <input
                type="text"
                name="title"
                placeholder="Give your blog a title…"
                value={formData.title}
                onChange={handleChange}
                required
                className="w-full px-4 py-3 text-sm bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl text-gray-900 dark:text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500/30 focus:border-blue-500 transition-colors"
              />
            </div>

            {/* Description */}
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
                  Content
                </label>
                <div className="flex items-center gap-3 text-xs text-gray-400 dark:text-gray-500">
                  <span>
                    {wordCount} {wordCount === 1 ? "word" : "words"}
                  </span>
                  <span>·</span>
                  <span>{charCount.toLocaleString()} chars</span>
                </div>
              </div>
              <textarea
                name="description"
                rows={20}
                placeholder="Write your blog content here… You have all the space you need."
                value={formData.description}
                onChange={handleChange}
                required
                className="w-full px-4 py-4 text-sm bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl text-gray-900 dark:text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500/30 focus:border-blue-500 transition-colors resize-y leading-relaxed min-h-75"
              />
              <p className="text-xs text-gray-400 dark:text-gray-600">
                Drag the bottom-right corner of the text area to make it taller.
              </p>
            </div>

            {/* Actions */}
            <div className="flex items-center gap-3 pt-1">
              <button
                type="button"
                onClick={() => navigate(-1)}
                className="flex items-center gap-1.5 px-5 py-3 text-sm font-medium text-gray-700 dark:text-gray-300 border border-gray-200 dark:border-gray-700 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-xl transition-colors"
              >
                <ArrowLeft size={15} />
                Cancel
              </button>
              <button
                type="submit"
                disabled={loading}
                className="flex-1 flex items-center justify-center gap-2 py-3 text-sm font-medium text-white bg-blue-500 hover:bg-blue-600 disabled:opacity-60 disabled:cursor-not-allowed rounded-xl transition-colors"
              >
                {loading ? (
                  <>
                    <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                    {type === "update" ? "Updating..." : "Publishing..."}
                  </>
                ) : (
                  <>
                    {type === "update" ? " Update blog" : "Publish blog"}
                    <ArrowRight size={15} />
                  </>
                )}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default BlogForm;
