import { Rss } from "lucide-react";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="border-t border-gray-200 dark:border-gray-800 bg-white/80 dark:bg-gray-950/80 backdrop-blur-md">
      <div className="max-w-7xl mx-auto px-6 py-8 flex flex-col sm:flex-row items-center justify-between gap-4">

        {/* Brand */}
        <div className="flex flex-col items-center sm:items-start gap-0.5">
          <Link to="/" className="text-sm font-semibold text-gray-900 dark:text-white tracking-tight">
            Blog<span className="text-blue-500">MS</span>
          </Link>
          <p className="text-xs text-gray-400 dark:text-gray-500 max-w-45text-center sm:text-left leading-relaxed">
            Share thoughts, ideas, and stories.
          </p>
        </div>

        {/* Links — Blogs removed since it's in navbar */}
        <div className="flex items-center gap-0.5">
          <FooterLink to="/blog/add">Write</FooterLink>
          <Dot />
          <FooterLink to="/myblogs">My Blogs</FooterLink>
          <Dot />
          <FooterLink to="/about">About</FooterLink>
        </div>

        {/* Right — RSS + copyright */}
        <div className="flex flex-col items-center sm:items-end gap-1.5">
    
            <Rss size={14} />
        
          <p className="text-xs text-gray-400 dark:text-gray-600">
            © {new Date().getFullYear()} BlogMS
          </p>
        </div>

      </div>
    </footer>
  );
};

const Dot = () => (
  <span className="text-gray-300 dark:text-gray-700 text-xs select-none">·</span>
);

const FooterLink = ({ to, children }) => (
  <Link
    to={to}
    className="px-2 py-1 text-xs text-gray-400 dark:text-gray-500 hover:text-gray-700 dark:hover:text-gray-300 transition-colors"
  >
    {children}
  </Link>
);

const IconLink = ({ href, label, children }) => (
  <a
    href={href}
    aria-label={label}
    target="_blank"
    rel="noopener noreferrer"
    className="w-7 h-7 flex items-center justify-center rounded-md text-gray-400 dark:text-gray-500 hover:text-gray-600 dark:hover:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
  >
    {children}
  </a>
);

export default Footer;