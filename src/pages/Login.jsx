import { useState } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const [form, setForm] = useState({ email: '', password: '' });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    setError('');
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    // Mock login logic
    setTimeout(() => {
      setLoading(false);
      if (form.email === 'demo@ajtracker.com' && form.password === 'password') {
        localStorage.setItem('aj_logged_in', 'true'); // Set login state
        navigate('/'); // Redirect to home page
      } else {
        setError('Invalid email or password.');
      }
    }, 1200);
  };

  // Animation variants
  const cardVariants = {
    hidden: { opacity: 0, y: 40, scale: 0.98 },
    visible: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.6, type: 'spring', bounce: 0.25 } },
    exit: { opacity: 0, y: -40, scale: 0.98, transition: { duration: 0.4 } },
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-400 via-pink-300 to-purple-400 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 px-4" style={{ fontFamily: 'Montserrat, Poppins, sans-serif' }}>
      <motion.div
        className="relative w-full max-w-md p-8 rounded-3xl shadow-2xl border border-white/30 dark:border-gray-700 bg-white/40 dark:bg-gray-800/60 backdrop-blur-lg"
        variants={cardVariants}
        initial="hidden"
        animate="visible"
        exit="exit"
        style={{ fontFamily: 'Montserrat, Poppins, sans-serif' }}
      >
        <h2 className="text-3xl font-extrabold mb-6 text-center bg-gradient-to-r from-blue-700 via-purple-600 to-pink-500 bg-clip-text text-transparent tracking-tight" style={{ fontFamily: 'Montserrat, Poppins, sans-serif' }}>
          Login
        </h2>
        {error && <motion.div className="mb-4 text-red-600 text-sm text-center" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>{error}</motion.div>}
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-sm font-semibold text-gray-700 dark:text-gray-200 mb-2">Email Address</label>
            <input
              type="email"
              name="email"
              value={form.email}
              onChange={handleChange}
              className="w-full px-4 py-3 border border-white/40 dark:border-gray-600 rounded-xl bg-white/60 dark:bg-gray-900/60 focus:ring-2 focus:ring-blue-400 dark:focus:ring-pink-400 focus:border-transparent text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-gray-500 shadow-sm backdrop-blur"
              placeholder="Enter your email"
              required
              style={{ fontFamily: 'Poppins, Montserrat, sans-serif' }}
            />
          </div>
          <div>
            <label className="block text-sm font-semibold text-gray-700 dark:text-gray-200 mb-2">Password</label>
            <input
              type="password"
              name="password"
              value={form.password}
              onChange={handleChange}
              className="w-full px-4 py-3 border border-white/40 dark:border-gray-600 rounded-xl bg-white/60 dark:bg-gray-900/60 focus:ring-2 focus:ring-blue-400 dark:focus:ring-pink-400 focus:border-transparent text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-gray-500 shadow-sm backdrop-blur"
              placeholder="Enter your password"
              required
              style={{ fontFamily: 'Poppins, Montserrat, sans-serif' }}
            />
          </div>
          <motion.button
            whileHover={{ scale: 1.04 }}
            whileTap={{ scale: 0.98 }}
            type="submit"
            disabled={loading}
            className="w-full bg-gradient-to-r from-blue-600 via-purple-600 to-pink-500 text-white font-bold py-3 rounded-xl shadow-lg hover:from-blue-700 hover:to-pink-600 transition-all text-lg tracking-wide disabled:opacity-60 disabled:cursor-not-allowed"
            style={{ fontFamily: 'Montserrat, Poppins, sans-serif' }}
          >
            {loading ? (
              <span className="flex items-center justify-center">
                <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Logging in...
              </span>
            ) : (
              'Login'
            )}
          </motion.button>
        </form>
        <div className="mt-6 text-center text-sm text-gray-600 dark:text-gray-300">
          Don&apos;t have an account?{' '}
          <button
            className="text-blue-600 dark:text-pink-400 font-semibold hover:underline focus:outline-none"
            onClick={() => navigate('/signup')}
            style={{ fontFamily: 'Montserrat, Poppins, sans-serif' }}
          >
            Sign Up
          </button>
        </div>
      </motion.div>
    </div>
  );
};

export default Login; 