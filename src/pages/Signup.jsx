import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';

const Signup = () => {
  const [form, setForm] = useState({
    name: '',
    email: '',
    password: '',
    phone: '',
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    setError('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.name || !form.email || !form.password || !form.phone) {
      setError('Please fill in all fields.');
      return;
    }
    setLoading(true); // Start loading
    try {
      const res = await axios.post('http://localhost:3008/signup', {
        name: form.name,
        email: form.email,
        password: form.password,
        phone_number: form.phone,
      });
      if (res.data.message === 'SUCCESS') {
        showSuccessToast();
        // Redirect to login after a short delay
        setTimeout(() => navigate('/login'), 2000);
      } else {
        setError(res.data.message || 'Signup failed.');
      }
    } catch (err) {
      setError(err.response?.data?.message || 'Server error');
    } finally {
      setLoading(false); // Stop loading
    }
  };

  const showSuccessToast = () => {
    // Create toast element
    const toast = document.createElement('div');
    toast.className = 'fixed top-4 right-4 bg-green-500 text-white px-4 py-3 rounded-lg shadow-lg z-50 flex items-center animate-fade-in';
    
    // Add checkmark icon
    const checkIcon = document.createElement('span');
    checkIcon.innerHTML = '✅';
    checkIcon.className = 'mr-2 text-xl';
    toast.appendChild(checkIcon);
    
    // Add message
    const message = document.createElement('span');
    message.textContent = 'Signup successful! You\'re ready to track prices.';
    message.className = 'font-medium';
    toast.appendChild(message);
    
    // Add to DOM
    document.body.appendChild(toast);
    
    // Remove after 5 seconds
    setTimeout(() => {
      toast.classList.add('animate-fade-out');
      setTimeout(() => {
        if (document.body.contains(toast)) {
          document.body.removeChild(toast);
        }
      }, 500);
    }, 5000);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-50 via-pink-50 to-yellow-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 px-4">
      <div className="w-full max-w-md p-8 rounded-3xl shadow-2xl border border-white/30 dark:border-gray-700 bg-white/40 dark:bg-gray-800/60 backdrop-blur-lg">
        <h2 className="text-3xl font-extrabold mb-6 text-center bg-gradient-to-r from-blue-700 via-purple-600 to-pink-500 bg-clip-text text-transparent tracking-tight">
          Sign Up
        </h2>
        {error && <div className="mb-4 text-red-600 text-sm text-center">{error}</div>}
        <form className="space-y-6" onSubmit={handleSubmit}>
              <div>
            <label className="block text-sm font-semibold text-gray-700 dark:text-gray-200 mb-2">Name</label>
                <input
                  type="text"
              name="name"
              value={form.name}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border border-white/40 dark:border-gray-600 rounded-xl bg-white/60 dark:bg-gray-900/60 focus:ring-2 focus:ring-blue-400 dark:focus:ring-pink-400 focus:border-transparent text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-gray-500 shadow-sm backdrop-blur"
              placeholder="Enter your name"
                  required
                />
              </div>
              <div>
            <label className="block text-sm font-semibold text-gray-700 dark:text-gray-200 mb-2">Email</label>
                <input
                  type="email"
                  name="email"
                  value={form.email}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border border-white/40 dark:border-gray-600 rounded-xl bg-white/60 dark:bg-gray-900/60 focus:ring-2 focus:ring-blue-400 dark:focus:ring-pink-400 focus:border-transparent text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-gray-500 shadow-sm backdrop-blur"
                  placeholder="Enter your email"
                  required
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
                    />
                  </div>
              <div>
                <label className="block text-sm font-semibold text-gray-700 dark:text-gray-200 mb-2">Phone Number</label>
                <input
                  type="tel"
                  name="phone"
                  value={form.phone}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border border-white/40 dark:border-gray-600 rounded-xl bg-white/60 dark:bg-gray-900/60 focus:ring-2 focus:ring-blue-400 dark:focus:ring-pink-400 focus:border-transparent text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-gray-500 shadow-sm backdrop-blur"
              placeholder="Enter your phone number"
                  required
                />
              </div>
          <button
                  type="submit"
                  disabled={loading}
                  className={`w-full bg-gradient-to-r from-blue-600 via-purple-600 to-pink-500 text-white font-bold py-3 rounded-xl shadow-lg hover:from-blue-700 hover:to-pink-600 transition-all text-lg tracking-wide ${loading ? 'opacity-60 cursor-not-allowed' : ''}`}
          >
            {loading ? (
              <span className="flex items-center justify-center">
                <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Signing up...
              </span>
            ) : (
              'Sign Up'
            )}
          </button>
        </form>
        <div className="mt-6 text-center text-sm text-gray-700 dark:text-gray-300">
          Already have an account?{' '}
          <Link to="/login" className="text-blue-600 hover:underline font-semibold">Login</Link>
        </div>
                  </div>
      
      <style jsx>{`
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(-20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        
        @keyframes fadeOut {
          from { opacity: 1; }
          to { opacity: 0; }
        }
        
        .animate-fade-in {
          animation: fadeIn 0.5s ease-out forwards;
        }
        
        .animate-fade-out {
          animation: fadeOut 0.5s ease-out forwards;
        }
      `}</style>
    </div>
  );
};

export default Signup; 