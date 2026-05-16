import { PenSquare, BookOpen, Users, Zap } from "lucide-react";
import { Link } from "react-router-dom";

const About = () => {
  return (
    <div className="min-h-screen max-w-5xl mx-auto px-6 py-16">

      {/* Header */}
      <div className="text-center mb-16">
        <span className="inline-block text-xs font-medium text-blue-500 bg-blue-50 dark:bg-blue-950/40 px-3 py-1 rounded-full mb-4">
          About us
        </span>
        <h1 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white tracking-tight mb-4">
          Built for writers,<br />by writers
        </h1>
        <p className="text-gray-500 dark:text-gray-400 max-w-xl mx-auto text-base leading-relaxed">
          We built this platform to help people share thoughts, ideas, and
          experiences with the world — simply and cleanly.
        </p>
      </div>

      {/* Stats row */}
      <div className="grid grid-cols-3 gap-4 mb-16">
        {[
          { value: "10K+", label: "Blogs published" },
          { value: "3K+", label: "Active writers" },
          { value: "100%", label: "Free to use" },
        ].map((s) => (
          <div
            key={s.label}
            className="bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-xl p-5 text-center"
          >
            <p className="text-2xl font-bold text-gray-900 dark:text-white mb-1">{s.value}</p>
            <p className="text-xs text-gray-500 dark:text-gray-400">{s.label}</p>
          </div>
        ))}
      </div>

      {/* Cards grid */}
      <div className="grid md:grid-cols-2 gap-4 mb-16">
        {[
          {
            icon: <Zap size={18} className="text-blue-500" />,
            title: "Our mission",
            body: "Provide a simple, clean blogging platform where anyone can write and manage blogs without complexity — no steep learning curve, no clutter.",
          },
          {
            icon: <BookOpen size={18} className="text-blue-500" />,
            title: "What you can do",
            body: "Create and publish blogs, manage your content from a personal dashboard, and explore ideas from a growing community of writers.",
          },
          {
            icon: <Users size={18} className="text-blue-500" />,
            title: "Who it's for",
            body: "Whether you're a seasoned blogger or writing your very first post, this platform is designed to feel familiar and effortless from day one.",
          },
          {
            icon: <PenSquare size={18} className="text-blue-500" />,
            title: "Why this platform?",
            body: "We believe everyone has something valuable to say. So we built a space that gets out of your way and lets your words do the talking.",
          },
        ].map((card) => (
          <div
            key={card.title}
            className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-xl p-6 hover:border-gray-300 dark:hover:border-gray-700 transition-colors"
          >
            <div className="w-8 h-8 bg-blue-50 dark:bg-blue-950/40 rounded-lg flex items-center justify-center mb-4">
              {card.icon}
            </div>
            <h2 className="text-sm font-semibold text-gray-900 dark:text-white mb-2">
              {card.title}
            </h2>
            <p className="text-sm text-gray-500 dark:text-gray-400 leading-relaxed">
              {card.body}
            </p>
          </div>
        ))}
      </div>

      {/* CTA */}
      <div className="border border-gray-200 dark:border-gray-800 rounded-2xl p-10 text-center bg-gray-50 dark:bg-gray-900">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
          Ready to start writing?
        </h2>
        <p className="text-sm text-gray-500 dark:text-gray-400 mb-6">
          Join thousands of writers sharing their ideas every day.
        </p>
        <div className="flex items-center justify-center gap-3">
          <Link
            to="/register"
            className="px-5 py-2 text-sm font-medium text-white bg-blue-500 hover:bg-blue-600 rounded-lg transition-colors"
          >
            Get started
          </Link>
          <Link
            to="/blogs/all"
            className="px-5 py-2 text-sm font-medium text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg transition-colors"
          >
            Browse blogs
          </Link>
        </div>
      </div>

    </div>
  );
};

export default About;