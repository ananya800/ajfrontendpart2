import { Link } from "react-router-dom";
import { FaGithub, FaTwitter, FaLinkedin, FaInstagram } from 'react-icons/fa';

const essentials = [
  { name: "Return Policy", path: "/return-policy" },
  { name: "Refund Policy", path: "/refund-policy" },
  { name: "Privacy Policy", path: "/privacy-policy" },
  { name: "Disclosure", path: "/disclosure" },
  { name: "About Us", path: "/about-us" },
  { name: "Contact Us", path: "/contact-us" },
];

const Footer = () => (
  <footer className="bg-gradient-to-r from-blue-200 via-blue-100 to-blue-200 dark:from-blue-950 dark:via-blue-900 dark:to-blue-950 py-10 mt-12 border-t border-blue-300 dark:border-blue-800">
    <div className="max-w-6xl mx-auto px-4 flex flex-col md:flex-row md:items-start md:justify-between gap-8">
      {/* Brand & Social */}
      <div className="flex flex-col items-center md:items-start gap-4 flex-1">
        <div className="text-2xl font-extrabold text-blue-700 dark:text-blue-300 font-serif tracking-wide">AJtracker</div>
        <div className="flex gap-4 mt-2">
          <a href="https://github.com/" target="_blank" rel="noopener noreferrer" className="text-blue-800 dark:text-blue-200 hover:text-yellow-500 dark:hover:text-yellow-400 text-xl"><FaGithub /></a>
          <a href="https://twitter.com/" target="_blank" rel="noopener noreferrer" className="text-blue-800 dark:text-blue-200 hover:text-yellow-500 dark:hover:text-yellow-400 text-xl"><FaTwitter /></a>
          <a href="https://linkedin.com/" target="_blank" rel="noopener noreferrer" className="text-blue-800 dark:text-blue-200 hover:text-yellow-500 dark:hover:text-yellow-400 text-xl"><FaLinkedin /></a>
          <a href="https://instagram.com/" target="_blank" rel="noopener noreferrer" className="text-blue-800 dark:text-blue-200 hover:text-yellow-500 dark:hover:text-yellow-400 text-xl"><FaInstagram /></a>
        </div>
      </div>
      {/* Quick Links */}
      <div className="flex flex-wrap gap-4 justify-center flex-1">
        {essentials.map(link => (
          <Link
            key={link.name}
            to={link.path}
            className="text-base font-semibold text-blue-800 dark:text-blue-200 hover:text-yellow-500 dark:hover:text-yellow-400 transition-colors duration-200 tracking-wide uppercase"
          >
            {link.name}
          </Link>
        ))}
      </div>
      {/* Newsletter Signup */}
      <div className="flex flex-col items-center md:items-end gap-3 flex-1">
        <div className="font-semibold text-blue-900 dark:text-blue-100 mb-1">Subscribe to our Newsletter</div>
        <form className="flex gap-2 w-full max-w-xs">
          <input
            type="email"
            placeholder="Your email address"
            className="px-3 py-2 rounded-lg border border-blue-300 dark:border-blue-700 bg-white dark:bg-gray-900 text-blue-900 dark:text-blue-100 focus:ring-2 focus:ring-blue-400 focus:outline-none flex-1"
          />
          <button
            type="submit"
            className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg font-semibold shadow"
          >
            Subscribe
          </button>
        </form>
        <div className="text-xs text-blue-600 dark:text-blue-400 mt-2">No spam. Unsubscribe anytime.</div>
      </div>
    </div>
    <div className="text-center text-xs text-blue-600 dark:text-blue-400 mt-8 font-mono">&copy; {new Date().getFullYear()} AJtracker. All rights reserved.</div>
  </footer>
);

export default Footer;

 