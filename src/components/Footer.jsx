import { Link } from "react-router-dom";

const essentials = [
  { name: "Return Policy", path: "/return-policy" },
  { name: "Refund Policy", path: "/refund-policy" },
  { name: "Privacy Policy", path: "/privacy-policy" },
  { name: "Disclosure", path: "/disclosure" },
  { name: "About Us", path: "/about-us" },
  { name: "Contact Us", path: "/contact-us" },
];

const Footer = () => (
  <footer className="bg-gradient-to-r from-blue-200 via-blue-100 to-blue-200 dark:from-blue-950 dark:via-blue-900 dark:to-blue-950 py-8 mt-12 border-t border-blue-300 dark:border-blue-800">
    <div className="max-w-5xl mx-auto px-4 flex flex-col md:flex-row items-center justify-between">
      <div className="text-2xl font-extrabold text-blue-700 dark:text-blue-300 mb-4 md:mb-0 font-serif tracking-wide">AJtracker</div>
      <div className="flex flex-wrap gap-4 justify-center">
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
    </div>
    <div className="text-center text-xs text-blue-600 dark:text-blue-400 mt-6 font-mono">&copy; {new Date().getFullYear()} AJtracker. All rights reserved.</div>
  </footer>
);

export default Footer;

 