import { Link } from "react-router-dom";
import jayji from "../../public/images/jayji.jpg";
import ananya from "../../public/images/ananya.jpg";
const AboutUs = () => (
  <div className="min-h-screen bg-gradient-to-br from-blue-100 via-pink-100 to-purple-100 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 py-16 px-2">
    <div className="text-center mb-16">
      <h1 className="text-5xl font-bold mb-6 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
        About AJtracker
      </h1>
      <p className="text-xl text-gray-700 dark:text-gray-300 max-w-3xl mx-auto leading-relaxed">
        Meet the team behind the smart price tracking solution that's helping thousands of shoppers save money and shop smarter.
      </p>
      <div className="mt-10 max-w-4xl mx-auto">
  <div className="bg-white dark:bg-gray-800 shadow-xl rounded-xl p-6">
    <h3 className="text-2xl font-semibold text-gray-800 dark:text-white mb-4">
      📊 AJtracker Presentation
    </h3>
    <div className="relative w-full pb-[56.25%] h-0 overflow-hidden rounded-xl border border-gray-300 dark:border-gray-700 shadow-lg">
  <iframe
    src="https://docs.google.com/presentation/d/e/2PACX-1vTgLdhXxef273slaEBbzjJKDyuwfmQKLMMApcVPf-czXbccSsN7qfBy7IxkaSXqdaIzZIZVlemFy_rw/pubembed?start=false&loop=false&delayms=5000"
    frameBorder="0"
    allowFullScreen
    className="absolute top-0 left-0 w-full h-full"
    title="AJtracker Slide"
  ></iframe>
</div>

  </div>
</div>


    </div>
    
    {/* Team Section */}
    <div className="bg-gradient-to-r from-blue-200 via-purple-200 to-pink-200 dark:from-blue-900 dark:via-purple-900 dark:to-pink-900 rounded-2xl p-8 mb-16 shadow-xl">
  <h2 className="text-3xl font-semibold text-center mb-8 text-gray-800 dark:text-white">
    Meet the Team
  </h2>
  <div className="grid md:grid-cols-2 gap-8 max-w-2xl mx-auto">
    
    {/* Member 1 */}
    <div className="text-center bg-white dark:bg-gray-800 rounded-xl shadow-md p-6">
      <div className="w-32 h-32 mx-auto mb-4 shadow-lg rounded-full overflow-hidden">
        <img
          src="./public/images/jayji.jpg"
          alt="Team Member 1"
          className="w-full h-full object-cover"
        />
      </div>
      <h3 className="text-xl font-semibold mb-2 text-gray-800 dark:text-white">
        Co-Founder & Developer
      </h3>
      <p className="text-gray-600 dark:text-gray-300 text-sm mb-3">
        Full-stack developer passionate about creating tools that solve real problems
      </p>
      <div className="text-xs text-gray-500 dark:text-gray-400">
        "Making smart shopping accessible to everyone"
      </div>
    </div>

    {/* Member 2 */}
    <div className="text-center bg-white dark:bg-gray-800 rounded-xl shadow-md p-6">
      <div className="w-32 h-32 mx-auto mb-4 shadow-lg rounded-full overflow-hidden">
        <img
          src="./public/images/ananya.jpg" 
          alt="Team Member 2"
          className="w-full h-full object-cover"
        />
      </div>
      <h3 className="text-xl font-semibold mb-2 text-gray-800 dark:text-white">
        Co-Founder & Developer
      </h3>
      <p className="text-gray-600 dark:text-gray-300 text-sm mb-3">
        Frontend specialist focused on creating seamless user experiences
      </p>
      <div className="text-xs text-gray-500 dark:text-gray-400">
        "Great design meets powerful functionality"
      </div>
    </div>
  </div>

  <p className="text-center mt-8 text-gray-600 dark:text-gray-300 italic">
    Two friends who turned their frustration with missing great deals into a solution that helps everyone shop smarter
  </p>
</div>
<div className="grid md:grid-cols-2 gap-8 mb-16">
      <div className="space-y-6 bg-gradient-to-br from-blue-200 to-blue-400 dark:from-blue-900 dark:to-blue-700 rounded-2xl shadow-lg p-8">
        <h2 className="text-3xl font-semibold text-gray-800 dark:text-white">
          What is AJtracker?
        </h2>
        <p className="text-gray-700 dark:text-gray-200 leading-relaxed">
          AJtracker is your smart shopping buddy — effortlessly tracking prices on mobiles, laptops, and more across top e-commerce sites. Just set it and forget it — we’ll alert you the moment the price drops. No more deal FOMO. Just smart savings. 💸📉


        </p>
        <p className="text-gray-700 dark:text-gray-200 leading-relaxed">
          Built for smart shoppers — whether you're a deal hunter chasing the best offers, a student buying gadgets on a budget, or just tired of checking prices every day. AJtracker watches the prices for you, so you never overpay
        </p>
      </div>
      <div className="space-y-6 bg-gradient-to-br from-pink-200 to-purple-300 dark:from-purple-900 dark:to-pink-900 rounded-2xl shadow-lg p-8">
        <h2 className="text-3xl font-semibold text-gray-800 dark:text-white">
          Our Mission
        </h2>
        <p className="text-gray-700 dark:text-gray-200 leading-relaxed">
          We believe that everyone deserves to get the best deals without the hassle of constantly checking prices. Our goal is to democratize smart shopping by providing powerful price tracking tools that are both easy to use and completely free.
        </p>
        <p className="text-gray-700 dark:text-gray-200 leading-relaxed">
          AJtracker empowers users to make informed purchasing decisions, save money, and shop with confidence knowing they're getting the best possible price.
        </p>
      </div>
    </div>

    {/* Features Section */}
    <div className="mb-16">
      <h2 className="text-3xl font-semibold text-center mb-8 text-gray-800 dark:text-white">
        Key Features
      </h2>
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        <div className="bg-gradient-to-br from-blue-100 to-blue-300 dark:from-blue-800 dark:to-blue-900 p-6 rounded-xl shadow-md">
          <div className="text-2xl mb-3">📉</div>
          <h3 className="text-lg font-semibold mb-2 text-gray-800 dark:text-white">Price Monitoring</h3>
          <p className="text-gray-600 dark:text-gray-300 text-sm">Track real-time or daily price changes for selected products</p>
        </div>
        <div className="bg-gradient-to-br from-pink-100 to-pink-300 dark:from-pink-800 dark:to-pink-900 p-6 rounded-xl shadow-md">
          <div className="text-2xl mb-3">🔔</div>
          <h3 className="text-lg font-semibold mb-2 text-gray-800 dark:text-white">Smart Notifications</h3>
          <p className="text-gray-600 dark:text-gray-300 text-sm">Get alerts when prices drop below your desired range</p>
        </div>
        <div className="bg-gradient-to-br from-purple-100 to-purple-300 dark:from-purple-800 dark:to-purple-900 p-6 rounded-xl shadow-md">
          <div className="text-2xl mb-3">📊</div>
          <h3 className="text-lg font-semibold mb-2 text-gray-800 dark:text-white">Price History Charts</h3>
          <p className="text-gray-600 dark:text-gray-300 text-sm">Visualize how prices have changed over time</p>
        </div>
        <div className="bg-gradient-to-br from-blue-200 to-blue-400 dark:from-blue-900 dark:to-blue-700 p-6 rounded-xl shadow-md">
          <div className="text-2xl mb-3">🔐</div>
          <h3 className="text-lg font-semibold mb-2 text-gray-800 dark:text-white">Secure Authentication</h3>
          <p className="text-gray-600 dark:text-gray-300 text-sm">Safe login/signup with Firebase Auth</p>
        </div>
        <div className="bg-gradient-to-br from-pink-200 to-pink-400 dark:from-pink-900 dark:to-pink-700 p-6 rounded-xl shadow-md">
          <div className="text-2xl mb-3">🌙</div>
          <h3 className="text-lg font-semibold mb-2 text-gray-800 dark:text-white">Dark Mode Support</h3>
          <p className="text-gray-600 dark:text-gray-300 text-sm">Seamless experience with light/dark themes</p>
        </div>
        <div className="bg-gradient-to-br from-yellow-100 to-yellow-300 dark:from-yellow-900 dark:to-yellow-700 p-6 rounded-xl shadow-md">
          <div className="text-2xl mb-3">💡</div>
          <h3 className="text-lg font-semibold mb-2 text-gray-800 dark:text-white">Minimal UI</h3>
          <p className="text-gray-600 dark:text-gray-300 text-sm">Built with React and Tailwind for a fast, clean experience</p>
        </div>
      </div>
    </div>
    <div className="text-center bg-gradient-to-r from-blue-200 via-pink-200 to-purple-200 dark:from-blue-900 dark:via-pink-900 dark:to-purple-900 rounded-2xl shadow-lg py-12 px-6">
      <h2 className="text-3xl font-semibold mb-6 text-gray-800 dark:text-white">
        Start Tracking Prices Today
      </h2>
      <p className="text-lg text-gray-700 dark:text-gray-300 mb-8 max-w-2xl mx-auto">
        Join thousands of smart shoppers who are already saving money with AJtracker. It's free, easy to use, and helps you never miss a great deal again.
      </p>
      {/* <div className="flex flex-col sm:flex-row gap-4 justify-center">
        <button className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-8 py-3 rounded-full text-lg font-semibold hover:from-blue-700 hover:to-purple-700 transition-all duration-300 transform hover:scale-105 shadow-lg">
          Start Tracking
        </button>
        <button className="border-2 border-blue-600 text-blue-600 dark:text-blue-400 dark:border-blue-400 px-8 py-3 rounded-full text-lg font-semibold hover:bg-blue-600 hover:text-white dark:hover:bg-blue-400 dark:hover:text-gray-900 transition-all duration-300">
          Learn More
        </button>
      </div> */}
      <div className="flex flex-col sm:flex-row gap-4 justify-center">
        <Link to="/Dashboard">
        <button className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-8 py-3 rounded-full text-lg font-semibold hover:from-blue-700 hover:to-purple-700 transition-all duration-300 transform hover:scale-105 shadow-lg">
        Start Tracking
        </button>
        </Link>
        <Link to="/about-us">
        <button className="border-2 border-blue-600 text-blue-600 dark:text-blue-400 dark:border-blue-400 px-8 py-3 rounded-full text-lg font-semibold hover:bg-blue-600 hover:text-white dark:hover:bg-blue-400 dark:hover:text-gray-900 transition-all duration-300">
          Learn More
        </button>
        </Link>
      </div>
    </div>
  </div>
);

export default AboutUs; 