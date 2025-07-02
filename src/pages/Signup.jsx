import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';

const Signup = () => {
  const [step, setStep] = useState(1);
  const [form, setForm] = useState({
    firstName: '',
    lastName: '',
    email: '',
    emailOtp: '',
    phone: '',
    phoneOtp: '',
  });
  const [emailOtpSent, setEmailOtpSent] = useState(false);
  const [emailOtpVerified, setEmailOtpVerified] = useState(false);
  const [phoneOtpSent, setPhoneOtpSent] = useState(false);
  const [phoneOtpVerified, setPhoneOtpVerified] = useState(false);
  const [mockEmailOtp, setMockEmailOtp] = useState('');
  const [mockPhoneOtp, setMockPhoneOtp] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  // Mock OTP generator
  const generateOtp = () => Math.floor(100000 + Math.random() * 900000).toString();

  // Handlers
  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    setError('');
  };

  // Step 1: Name
  const handleNextFromName = (e) => {
    e.preventDefault();
    if (!form.firstName.trim() || !form.lastName.trim()) {
      setError('Please enter your first and last name.');
      return;
    }
    setStep(2);
  };

  // Step 2: Email OTP
  const handleSendEmailOtp = (e) => {
    e.preventDefault();
    if (!form.email.match(/^[^@\s]+@[^@\s]+\.[^@\s]+$/)) {
      setError('Please enter a valid email address.');
      return;
    }
    const otp = generateOtp();
    setMockEmailOtp(otp);
    setEmailOtpSent(true);
    setError('');
    alert(`Mock OTP sent to email: ${otp}`); // For demo
  };

  const handleVerifyEmailOtp = (e) => {
    e.preventDefault();
    if (form.emailOtp === mockEmailOtp) {
      setEmailOtpVerified(true);
      setError('');
      setStep(3);
    } else {
      setError('Incorrect OTP. Please try again.');
    }
  };

  // Step 3: Phone OTP
  const handleSendPhoneOtp = (e) => {
    e.preventDefault();
    if (!form.phone.match(/^\d{10}$/)) {
      setError('Please enter a valid 10-digit phone number.');
      return;
    }
    const otp = generateOtp();
    setMockPhoneOtp(otp);
    setPhoneOtpSent(true);
    setError('');
    alert(`Mock OTP sent to phone: ${otp}`); // For demo
  };

  const handleVerifyPhoneOtp = (e) => {
    e.preventDefault();
    if (form.phoneOtp === mockPhoneOtp) {
      setPhoneOtpVerified(true);
      setError('');
      setTimeout(() => {
        navigate('/login');
      }, 1200);
    } else {
      setError('Incorrect OTP. Please try again.');
    }
  };

  // Animation variants
  const cardVariants = {
    hidden: { opacity: 0, y: 40, scale: 0.98 },
    visible: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.6, type: 'spring', bounce: 0.25 } },
    exit: { opacity: 0, y: -40, scale: 0.98, transition: { duration: 0.4 } },
  };
  const stepVariants = {
    hidden: { opacity: 0, x: 40 },
    visible: { opacity: 1, x: 0, transition: { duration: 0.5 } },
    exit: { opacity: 0, x: -40, transition: { duration: 0.3 } },
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
          Sign Up
        </h2>
        <div className="flex justify-center mb-8 gap-2">
          {[1,2,3].map((s) => (
            <motion.div
              key={s}
              className={`w-8 h-2 rounded-full transition-all duration-300 ${step === s ? 'bg-gradient-to-r from-blue-600 to-pink-500 shadow-lg' : 'bg-white/40 dark:bg-gray-700'}`}
              layout
            />
          ))}
        </div>
        {error && <motion.div className="mb-4 text-red-600 text-sm text-center" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>{error}</motion.div>}
        <AnimatePresence mode="wait">
          {step === 1 && (
            <motion.form
              key="step1"
              onSubmit={handleNextFromName}
              className="space-y-6"
              variants={stepVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
            >
              <div>
                <label className="block text-sm font-semibold text-gray-700 dark:text-gray-200 mb-2">First Name</label>
                <input
                  type="text"
                  name="firstName"
                  value={form.firstName}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border border-white/40 dark:border-gray-600 rounded-xl bg-white/60 dark:bg-gray-900/60 focus:ring-2 focus:ring-blue-400 dark:focus:ring-pink-400 focus:border-transparent text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-gray-500 shadow-sm backdrop-blur"
                  placeholder="Enter your first name"
                  required
                  style={{ fontFamily: 'Poppins, Montserrat, sans-serif' }}
                />
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-700 dark:text-gray-200 mb-2">Last Name</label>
                <input
                  type="text"
                  name="lastName"
                  value={form.lastName}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border border-white/40 dark:border-gray-600 rounded-xl bg-white/60 dark:bg-gray-900/60 focus:ring-2 focus:ring-blue-400 dark:focus:ring-pink-400 focus:border-transparent text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-gray-500 shadow-sm backdrop-blur"
                  placeholder="Enter your last name"
                  required
                  style={{ fontFamily: 'Poppins, Montserrat, sans-serif' }}
                />
              </div>
              <motion.button
                whileHover={{ scale: 1.04 }}
                whileTap={{ scale: 0.98 }}
                type="submit"
                className="w-full bg-gradient-to-r from-blue-600 via-purple-600 to-pink-500 text-white font-bold py-3 rounded-xl shadow-lg hover:from-blue-700 hover:to-pink-600 transition-all text-lg tracking-wide"
                style={{ fontFamily: 'Montserrat, Poppins, sans-serif' }}
              >
                Next
              </motion.button>
            </motion.form>
          )}
          {step === 2 && (
            <motion.form
              key="step2"
              onSubmit={emailOtpVerified ? undefined : (emailOtpSent ? handleVerifyEmailOtp : handleSendEmailOtp)}
              className="space-y-6"
              variants={stepVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
            >
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
                  disabled={emailOtpSent}
                  style={{ fontFamily: 'Poppins, Montserrat, sans-serif' }}
                />
              </div>
              {!emailOtpSent && (
                <motion.button
                  whileHover={{ scale: 1.04 }}
                  whileTap={{ scale: 0.98 }}
                  type="submit"
                  className="w-full bg-gradient-to-r from-blue-600 via-purple-600 to-pink-500 text-white font-bold py-3 rounded-xl shadow-lg hover:from-blue-700 hover:to-pink-600 transition-all text-lg tracking-wide"
                  style={{ fontFamily: 'Montserrat, Poppins, sans-serif' }}
                >
                  Send OTP
                </motion.button>
              )}
              {emailOtpSent && !emailOtpVerified && (
                <>
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 dark:text-gray-200 mb-2">Enter OTP</label>
                    <input
                      type="text"
                      name="emailOtp"
                      value={form.emailOtp}
                      onChange={handleChange}
                      className="w-full px-4 py-3 border border-white/40 dark:border-gray-600 rounded-xl bg-white/60 dark:bg-gray-900/60 focus:ring-2 focus:ring-blue-400 dark:focus:ring-pink-400 focus:border-transparent text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-gray-500 shadow-sm backdrop-blur"
                      placeholder="Enter OTP sent to your email"
                      required
                      style={{ fontFamily: 'Poppins, Montserrat, sans-serif' }}
                    />
                  </div>
                  <motion.button
                    whileHover={{ scale: 1.04 }}
                    whileTap={{ scale: 0.98 }}
                    type="submit"
                    className="w-full bg-gradient-to-r from-blue-600 via-purple-600 to-pink-500 text-white font-bold py-3 rounded-xl shadow-lg hover:from-blue-700 hover:to-pink-600 transition-all text-lg tracking-wide"
                    style={{ fontFamily: 'Montserrat, Poppins, sans-serif' }}
                  >
                    Verify & Next
                  </motion.button>
                </>
              )}
            </motion.form>
          )}
          {step === 3 && (
            <motion.form
              key="step3"
              onSubmit={phoneOtpVerified ? undefined : (phoneOtpSent ? handleVerifyPhoneOtp : handleSendPhoneOtp)}
              className="space-y-6"
              variants={stepVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
            >
              <div>
                <label className="block text-sm font-semibold text-gray-700 dark:text-gray-200 mb-2">Phone Number</label>
                <input
                  type="tel"
                  name="phone"
                  value={form.phone}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border border-white/40 dark:border-gray-600 rounded-xl bg-white/60 dark:bg-gray-900/60 focus:ring-2 focus:ring-blue-400 dark:focus:ring-pink-400 focus:border-transparent text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-gray-500 shadow-sm backdrop-blur"
                  placeholder="Enter your 10-digit phone number"
                  required
                  disabled={phoneOtpSent}
                  style={{ fontFamily: 'Poppins, Montserrat, sans-serif' }}
                />
              </div>
              {!phoneOtpSent && (
                <motion.button
                  whileHover={{ scale: 1.04 }}
                  whileTap={{ scale: 0.98 }}
                  type="submit"
                  className="w-full bg-gradient-to-r from-blue-600 via-purple-600 to-pink-500 text-white font-bold py-3 rounded-xl shadow-lg hover:from-blue-700 hover:to-pink-600 transition-all text-lg tracking-wide"
                  style={{ fontFamily: 'Montserrat, Poppins, sans-serif' }}
                >
                  Send OTP
                </motion.button>
              )}
              {phoneOtpSent && !phoneOtpVerified && (
                <>
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 dark:text-gray-200 mb-2">Enter OTP</label>
                    <input
                      type="text"
                      name="phoneOtp"
                      value={form.phoneOtp}
                      onChange={handleChange}
                      className="w-full px-4 py-3 border border-white/40 dark:border-gray-600 rounded-xl bg-white/60 dark:bg-gray-900/60 focus:ring-2 focus:ring-blue-400 dark:focus:ring-pink-400 focus:border-transparent text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-gray-500 shadow-sm backdrop-blur"
                      placeholder="Enter OTP sent to your phone"
                      required
                      style={{ fontFamily: 'Poppins, Montserrat, sans-serif' }}
                    />
                  </div>
                  <motion.button
                    whileHover={{ scale: 1.04 }}
                    whileTap={{ scale: 0.98 }}
                    type="submit"
                    className="w-full bg-gradient-to-r from-blue-600 via-purple-600 to-pink-500 text-white font-bold py-3 rounded-xl shadow-lg hover:from-blue-700 hover:to-pink-600 transition-all text-lg tracking-wide"
                    style={{ fontFamily: 'Montserrat, Poppins, sans-serif' }}
                  >
                    Verify & Signup
                  </motion.button>
                </>
              )}
              {phoneOtpVerified && (
                <motion.div className="text-green-600 text-center font-semibold" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
                  Signup successful! Redirecting to login...
                </motion.div>
              )}
            </motion.form>
          )}
        </AnimatePresence>
      </motion.div>
    </div>
  );
};

export default Signup; 