import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

const LoadingScreen = ({ message, duration = 0, onSkip = null }) => {
  // const [showSkip, setShowSkip] = useState(false);
  const [currentMessage, setCurrentMessage] = useState(message || "Tracking best deals for you...");
  const messages = [
    "Tracking best deals for you...",
    "Checking price drops...",
    "Fetching product insights...",
    "Analyzing price trends..."
  ];

  // // Show skip button after 3 seconds if loading takes too long
  // useEffect(() => {
  //   const timer = setTimeout(() => {
  //     setShowSkip(true);
  //   }, 3000);

  //   return () => clearTimeout(timer);
  // }, []);

  // Cycle through messages
  useEffect(() => {
    let messageIndex = 0;
    const interval = setInterval(() => {
      messageIndex = (messageIndex + 1) % messages.length;
      setCurrentMessage(messages[messageIndex]);
    }, 2000);

    return () => clearInterval(interval);
  }, []);

  // Rupee symbols animation
  const rupeeSymbols = Array.from({ length: 12 }, (_, i) => ({
    id: i,
    x: Math.random() * 100,
    delay: Math.random() * 2,
    duration: 2 + Math.random() * 3,
    size: 16 + Math.random() * 24
  }));

  return (
    <div className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-white dark:bg-gray-900 bg-opacity-95 dark:bg-opacity-95">
      {/* Graph animation */}
      <div className="relative w-64 h-32 mb-8">
        <motion.div 
          className="absolute left-0 bottom-0 w-full h-px bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500"
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ duration: 1.5 }}
        />
        <motion.div 
          className="absolute left-0 bottom-0 w-px h-full bg-gradient-to-t from-indigo-500 via-purple-500 to-pink-500"
          initial={{ scaleY: 0 }}
          animate={{ scaleY: 1 }}
          transition={{ duration: 1.5 }}
        />
        
        {/* Price line */}
        <svg className="absolute inset-0 w-full h-full" viewBox="0 0 100 50">
          <motion.path
            d="M 0,25 Q 10,10 20,30 T 40,15 T 60,35 T 80,5 T 100,25"
            fill="none"
            stroke="url(#gradient)"
            strokeWidth="2"
            initial={{ pathLength: 0, opacity: 0 }}
            animate={{ pathLength: 1, opacity: 1 }}
            transition={{ duration: 2, repeat: Infinity, repeatType: "loop" }}
          />
          <defs>
            <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#6366f1" />
              <stop offset="50%" stopColor="#a855f7" />
              <stop offset="100%" stopColor="#ec4899" />
            </linearGradient>
          </defs>
        </svg>
        
        {/* Animated price point */}
        <motion.div
          className="absolute w-4 h-4 rounded-full bg-pink-500 shadow-lg shadow-pink-500/50"
          initial={{ x: 0, y: 25 }}
          animate={{
            x: [0, 20, 40, 60, 80, 100],
            y: [25, 30, 15, 35, 5, 25]
          }}
          transition={{
            duration: 4,
            repeat: Infinity,
            repeatType: "loop",
            times: [0, 0.2, 0.4, 0.6, 0.8, 1]
          }}
        />
      </div>
      
      {/* Rupee symbols */}
      <div className="relative w-64 h-32">
        {rupeeSymbols.map(symbol => (
          <motion.div
            key={symbol.id}
            className="absolute text-indigo-600 dark:text-indigo-400 font-bold"
            style={{ fontSize: symbol.size, left: `${symbol.x}%` }}
            initial={{ y: -100, opacity: 0 }}
            animate={{ y: 200, opacity: [0, 1, 0] }}
            transition={{
              duration: symbol.duration,
              repeat: Infinity,
              delay: symbol.delay,
              ease: "easeIn"
            }}
          >
            ₹
          </motion.div>
        ))}
      </div>
      
      {/* Loading text */}
      <motion.div
        className="text-lg font-medium text-gray-800 dark:text-gray-200 mt-8"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        {currentMessage}
      </motion.div>
      
      {/* Loading spinner */}
      <div className="mt-4">
        <svg className="animate-spin h-8 w-8 text-indigo-600 dark:text-indigo-400" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
        </svg>
      </div>
      
      {/* Skip button */}
      {/* {showSkip && onSkip && (
        <motion.button
          onClick={onSkip}
          className="mt-8 px-4 py-2 text-sm text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-100"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.3 }}
        >
          Skip animation
        </motion.button>
      )} */}
    </div>
  );
};

export default LoadingScreen; 