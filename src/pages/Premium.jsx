import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Navbar from "../components/Navbar";
import axios from "axios";

const Premium = () => {
  const [tokens, setTokens] = useState(100);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const response = await axios.get("http://localhost:3008/check-auth", {
          withCredentials: true
        });
        setIsLoggedIn(response.data.isLoggedIn);
        if (response.data.isLoggedIn) {
          setUser(response.data.user);
          // In a real app, you would fetch the user's tokens from the backend
          // For now, we'll simulate it with local state
          setTokens(response.data.user?.tokens || 100);
        }
      } catch (err) {
        console.error("Auth check error:", err);
      } finally {
        setLoading(false);
      }
    };

    checkAuth();
  }, []);

  // Simulate token usage when user interacts with the page
  const useToken = () => {
    if (tokens > 0) {
      setTokens(prevTokens => prevTokens - 1);
    }
  };

  const buyPremium = () => {
    // In a real app, this would redirect to a payment gateway
    alert("This would redirect to a payment gateway in a real app.");
  };

  if (loading) {
    return <div className="min-h-screen flex items-center justify-center">Loading...</div>;
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <Navbar />
      
      <div className="max-w-4xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h1 className="text-4xl font-extrabold tracking-tight text-gray-900 dark:text-white sm:text-5xl">
            <span className="bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 bg-clip-text text-transparent">
              AJ Tracker Premium
            </span>
          </h1>
          <p className="mt-4 text-xl text-gray-500 dark:text-gray-300">
            Unlock the full potential of price tracking
          </p>
        </div>

        {/* Token Display */}
        <div className="mt-10 bg-white dark:bg-gray-800 rounded-lg shadow-xl overflow-hidden">
          <div className="px-6 py-8">
            <div className="flex items-center justify-between">
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Your Tokens</h2>
              <div className="flex items-center">
                <span className="text-3xl font-bold bg-gradient-to-r from-yellow-400 to-yellow-600 bg-clip-text text-transparent">
                  {tokens}
                </span>
                <svg className="w-8 h-8 ml-2 text-yellow-500" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM9 5a1 1 0 012 0v5a1 1 0 01-1 1H6a1 1 0 110-2h2V5z" clipRule="evenodd" />
                </svg>
              </div>
            </div>
            
            <div className="mt-4">
              <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2.5">
                <div 
                  className="bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 h-2.5 rounded-full" 
                  style={{ width: `${(tokens/100) * 100}%` }}
                ></div>
              </div>
              <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">
                {tokens > 0 
                  ? `You have ${tokens} tokens remaining. Each product tracking uses 1 token.` 
                  : "You've used all your tokens. Upgrade to Premium for unlimited tracking!"}
              </p>
            </div>
            
            {tokens > 0 ? (
              <button 
                onClick={useToken}
                className="mt-6 px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 transition"
              >
                Simulate Using a Token
              </button>
            ) : (
              <button 
                onClick={buyPremium}
                className="mt-6 px-4 py-2 bg-gradient-to-r from-indigo-600 to-pink-600 text-white rounded-md hover:from-indigo-700 hover:to-pink-700 transition"
              >
                Upgrade to Premium
              </button>
            )}
          </div>
        </div>

        {/* Premium Features */}
        <div className="mt-12 grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
            <div className="w-12 h-12 bg-indigo-100 dark:bg-indigo-900 rounded-lg flex items-center justify-center mb-4">
              <svg className="w-6 h-6 text-indigo-600 dark:text-indigo-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
              </svg>
            </div>
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">Unlimited Tracking</h3>
            <p className="text-gray-600 dark:text-gray-300">Track as many products as you want without any limitations.</p>
          </div>
          
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
            <div className="w-12 h-12 bg-purple-100 dark:bg-purple-900 rounded-lg flex items-center justify-center mb-4">
              <svg className="w-6 h-6 text-purple-600 dark:text-purple-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
              </svg>
            </div>
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">Priority Alerts</h3>
            <p className="text-gray-600 dark:text-gray-300">Get instant notifications when prices drop to your desired level.</p>
          </div>
          
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
            <div className="w-12 h-12 bg-pink-100 dark:bg-pink-900 rounded-lg flex items-center justify-center mb-4">
              <svg className="w-6 h-6 text-pink-600 dark:text-pink-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
              </svg>
            </div>
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">Advanced Analytics</h3>
            <p className="text-gray-600 dark:text-gray-300">Get detailed price history and prediction analytics for better decisions.</p>
          </div>
        </div>

        {/* Pricing */}
        <div className="mt-16 bg-white dark:bg-gray-800 rounded-lg shadow-xl overflow-hidden">
          <div className="px-6 py-8">
            <h2 className="text-2xl font-bold text-center text-gray-900 dark:text-white mb-8">Premium Plans</h2>
            
            <div className="flex flex-col md:flex-row justify-center gap-8">
              <div className="bg-gray-50 dark:bg-gray-700 p-6 rounded-lg shadow-md flex-1 max-w-xs">
                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">Monthly</h3>
                <p className="text-3xl font-bold text-indigo-600 dark:text-indigo-400 mb-4">₹199<span className="text-gray-500 text-lg font-normal">/month</span></p>
                <ul className="mb-6 space-y-2">
                  <li className="flex items-center text-gray-600 dark:text-gray-300">
                    <svg className="w-4 h-4 mr-2 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                    Unlimited product tracking
                  </li>
                  <li className="flex items-center text-gray-600 dark:text-gray-300">
                    <svg className="w-4 h-4 mr-2 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                    Priority alerts
                  </li>
                </ul>
                <button 
                  onClick={buyPremium}
                  className="w-full px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 transition"
                >
                  Get Started
                </button>
              </div>
              
              <div className="bg-gradient-to-br from-indigo-50 to-pink-50 dark:from-indigo-900 dark:to-pink-900 p-6 rounded-lg shadow-md flex-1 max-w-xs border-2 border-indigo-500 dark:border-indigo-400">
                <div className="absolute -mt-10 ml-16 bg-gradient-to-r from-indigo-500 to-pink-500 text-white px-4 py-1 rounded-full text-sm font-bold">Best Value</div>
                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">Yearly</h3>
                <p className="text-3xl font-bold text-indigo-600 dark:text-indigo-400 mb-4">₹1,999<span className="text-gray-500 text-lg font-normal">/year</span></p>
                <ul className="mb-6 space-y-2">
                  <li className="flex items-center text-gray-600 dark:text-gray-300">
                    <svg className="w-4 h-4 mr-2 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                    Unlimited product tracking
                  </li>
                  <li className="flex items-center text-gray-600 dark:text-gray-300">
                    <svg className="w-4 h-4 mr-2 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                    Priority alerts
                  </li>
                  <li className="flex items-center text-gray-600 dark:text-gray-300">
                    <svg className="w-4 h-4 mr-2 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                    Advanced analytics
                  </li>
                  <li className="flex items-center text-gray-600 dark:text-gray-300">
                    <svg className="w-4 h-4 mr-2 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                    Save 16% (2 months free)
                  </li>
                </ul>
                <button 
                  onClick={buyPremium}
                  className="w-full px-4 py-2 bg-gradient-to-r from-indigo-600 to-pink-600 text-white rounded-md hover:from-indigo-700 hover:to-pink-700 transition"
                >
                  Get Started
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Premium; 