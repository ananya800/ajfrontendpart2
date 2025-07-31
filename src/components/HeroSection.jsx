// src/components/HeroSection.jsx
import { useNavigate } from "react-router-dom";

const HeroSection = () => {
  const navigate = useNavigate();

  return (
    <div className="relative max-w-5xl mx-auto px-4 pt-10 pb-8">
      {/* Hero Content */}
      <div className="rounded-3xl bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 dark:from-blue-900 dark:via-purple-900 dark:to-pink-900 shadow-2xl p-10 text-center flex flex-col items-center relative z-10">
        <div className="text-6xl mb-4">🛒</div>
        <h1 className="text-4xl sm:text-5xl font-extrabold mb-4 text-white drop-shadow-lg">
          Track Prices. Save Money. Shop Smart.
        </h1>
        <p className="text-lg sm:text-xl text-white/90 mb-6 max-w-2xl mx-auto">
          AJtracker helps you monitor prices, get instant alerts, and never miss a deal again. Join
          thousands of smart shoppers today!
        </p>
        <button
          className="bg-yellow-400 hover:bg-yellow-500 text-lg font-bold px-8 py-3 rounded-full shadow-lg transition-all duration-300"
          onClick={() => navigate("/Dashboard")}
        >
          Start Tracking Now
        </button>
      </div>
    </div>
  );
};

export default HeroSection;
