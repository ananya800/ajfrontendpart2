import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSubmit = e => {
    e.preventDefault();
    localStorage.setItem("ajtracker_auth", JSON.stringify({ email }));
    navigate("/dashboard");
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-950 flex flex-col">
      <Navbar />
      <form onSubmit={handleSubmit} className="max-w-md w-full mx-auto mt-16 bg-white dark:bg-gray-900 p-8 rounded-lg shadow-md flex flex-col gap-4">
        <h2 className="text-2xl font-bold mb-2 text-center">Login</h2>
        <input type="email" required placeholder="Email" value={email} onChange={e => setEmail(e.target.value)} className="px-4 py-2 rounded border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100" />
        <input type="password" required placeholder="Password" value={password} onChange={e => setPassword(e.target.value)} className="px-4 py-2 rounded border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100" />
        <button type="submit" className="bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition">Login</button>
      </form>
    </div>
  );
};

export default Login; 