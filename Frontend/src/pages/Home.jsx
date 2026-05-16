import { Link } from "react-router-dom";
import { PenSquare, Zap, Globe, ArrowRight, BookOpen } from "lucide-react";

const Home = () => {
  return (
    <div className="min-h-screen">

      {/* Hero */}
      <section className="max-w-5xl mx-auto px-6 pt-24 pb-20 text-center">
        <span className="inline-block text-xs font-medium text-blue-500 bg-blue-50 dark:bg-blue-950/40 px-3 py-1 rounded-full mb-6">
          Simple blogging, done right
        </span>

        <h1 className="text-5xl md:text-6xl font-bold text-gray-900 dark:text-white tracking-tight leading-tight mb-6">
          Share your thoughts<br />
          <span className="text-blue-500">with the world</span>
        </h1>

        <p className="text-gray-500 dark:text-gray-400 max-w-xl mx-auto text-base leading-relaxed mb-10">
          A clean, distraction-free blogging platform where you can write,
          manage, and explore ideas — no complexity, just words.
        </p>

        <div className="flex items-center justify-center gap-3">
          <Link
            to="/blog/add"
            className="flex items-center gap-2 px-6 py-2.5 text-sm font-medium text-white bg-blue-500 hover:bg-blue-600 rounded-lg transition-colors"
          >
            <PenSquare size={15} />
            Start writing
          </Link>
          <Link
            to="/blogs/all"
            className="flex items-center gap-2 px-6 py-2.5 text-sm font-medium text-gray-700 dark:text-gray-300 border border-gray-200 dark:border-gray-700 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg transition-colors"
          >
            Explore blogs
            <ArrowRight size={15} />
          </Link>
        </div>
      </section>

      {/* Divider */}
      <div className="border-t border-gray-100 dark:border-gray-800" />

      {/* Features */}
      <section className="max-w-5xl mx-auto px-6 py-20">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white tracking-tight mb-3">
            Write. Organize. Share.
          </h2>
          <p className="text-sm text-gray-500 dark:text-gray-400 max-w-md mx-auto">
            Everything you need to publish great content — nothing you don't.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-4">
          {[
            {
              icon: <PenSquare size={18} className="text-blue-500" />,
              title: "Quick writing",
              body: "A focused editor that gets out of your way so you can concentrate on what matters — your ideas.",
            },
            {
              icon: <Zap size={18} className="text-blue-500" />,
              title: "Fast management",
              body: "Create, edit, and delete your blogs from a personal dashboard. Everything in one place.",
            },
            {
              icon: <Globe size={18} className="text-blue-500" />,
              title: "Easy sharing",
              body: "Publish instantly and share your posts with a growing community of curious readers.",
            },
          ].map((f) => (
            <div
              key={f.title}
              className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-xl p-6 hover:border-gray-300 dark:hover:border-gray-700 transition-colors"
            >
              <div className="w-8 h-8 bg-blue-50 dark:bg-blue-950/40 rounded-lg flex items-center justify-center mb-4">
                {f.icon}
              </div>
              <h3 className="text-sm font-semibold text-gray-900 dark:text-white mb-2">
                {f.title}
              </h3>
              <p className="text-sm text-gray-500 dark:text-gray-400 leading-relaxed">
                {f.body}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* Divider */}
      <div className="border-t border-gray-100 dark:border-gray-800" />

      {/* CTA */}
      <section className="max-w-5xl mx-auto px-6 py-20">
        <div className="bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-2xl p-12 text-center">
          <div className="w-10 h-10 bg-blue-50 dark:bg-blue-950/40 rounded-xl flex items-center justify-center mx-auto mb-5">
            <BookOpen size={20} className="text-blue-500" />
          </div>
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
            Ready to start writing?
          </h2>
          <p className="text-sm text-gray-500 dark:text-gray-400 mb-8 max-w-sm mx-auto">
            Join thousands of writers already sharing their ideas on BlogMS.
          </p>
          <div className="flex items-center justify-center gap-3">
            <Link
              to="/register"
              className="px-6 py-2.5 text-sm font-medium text-white bg-blue-500 hover:bg-blue-600 rounded-lg transition-colors"
            >
              Create an account
            </Link>
            <Link
              to="/about"
              className="px-6 py-2.5 text-sm font-medium text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg transition-colors"
            >
              Learn more
            </Link>
          </div>
        </div>
      </section>

    </div>
  );
};

export default Home;