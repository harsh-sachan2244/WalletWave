import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Logo from './Logo';
import axios from 'axios';
import { useNavigate } from "react-router-dom";
import { API_URL } from "../api";

export default function LoginPage() {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(false);
  const [message, setMessage] = useState('');
  const [isError, setIsError] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleLogin = async(e) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const response = await axios.post(
        `${API_URL}/login`,
        {
          email,
          password
        },
        {
          withCredentials: true
        }
      );
      console.log(response.data);
      setIsError(false);
      setMessage(`Successfully logged in as ${email}! Redirecting...`);
     navigate("/dashboard");
    } catch (error) {
      console.log(error);
      setIsError(true);
      setMessage(
        error.response?.data?.message || "Something went wrong"
      );
    }
    finally {
  setIsLoading(false);
}
  };

  return (
    <div className="min-h-screen bg-zinc-900 text-zinc-100 py-8 sm:py-12 px-4 flex flex-col justify-center">
      {/* Back to Home Link */}
      <div className="max-w-md mx-auto w-full mb-6">
        <Link
          to="/"
          className="text-sm font-medium text-emerald-400 hover:text-emerald-300 transition inline-flex items-center gap-1.5 cursor-pointer"
        >
          <span>←</span> Back to WalletWave
        </Link>
      </div>

      {/* Login Card */}
      <div className="max-w-md mx-auto w-full bg-zinc-800/90 p-6 sm:p-8 rounded-2xl border border-zinc-700/80 shadow-2xl">
        
        {/* Header with Logo */}
        <div className="flex flex-col items-center mb-7">
          <Link to="/" className="cursor-pointer">
            <Logo size="large" />
          </Link>
          <h1 className="text-2xl font-bold text-white mt-4 tracking-tight">
            Log In to WalletWave
          </h1>
          <p className="text-sm text-zinc-400 mt-1 text-center">
            Welcome back! Enter your details to view your expense dashboard.
          </p>
        </div>

        {/* Warning / Status Message (Not inside a box or div) */}
        {message && (
          <p
            className={`text-sm text-center font-medium mb-4 ${
              isError ? 'text-red-500' : 'text-emerald-400'
            }`}
          >
            {message}
          </p>
        )}

        {/* Login Form */}
        <form onSubmit={handleLogin} className="space-y-4">
          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-zinc-300 mb-1.5">
              Email Address
            </label>
            <input
              type="email"
              required
              placeholder="alex@example.com"
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
                if (isError) {
                  setIsError(false);
                  setMessage('');
                }
              }}
              className={`w-full px-3.5 py-2.5 bg-zinc-900 border rounded-xl focus:outline-none text-sm text-white placeholder-zinc-500 ${
                isError && (message.toLowerCase().includes('user') || message.toLowerCase().includes('email') || message.toLowerCase().includes('exist'))
                  ? 'border-red-500 focus:ring-2 focus:ring-red-500'
                  : 'border-zinc-700 focus:ring-2 focus:ring-emerald-400'
              }`}
            />
          </div>

          <div>
            <div className="flex items-center justify-between mb-1.5">
              <label className="text-xs font-semibold uppercase tracking-wider text-zinc-300">
                Password
              </label>
              <button
                type="button"
                onClick={() => {
                  setIsError(false);
                  setMessage('Password reset link sent to your email.');
                }}
                className="text-xs text-emerald-400 hover:underline cursor-pointer"
              >
                Forgot password?
              </button>
            </div>
            <input
              type="password"
              required
              placeholder="••••••••••••"
              value={password}
              onChange={(e) => {
                setPassword(e.target.value);
                if (isError) {
                  setIsError(false);
                  setMessage('');
                }
              }}
              className={`w-full px-3.5 py-2.5 bg-zinc-900 border rounded-xl focus:outline-none text-sm text-white placeholder-zinc-500 ${
                isError && (message.toLowerCase().includes('password') || message.toLowerCase().includes('incorrect'))
                  ? 'border-red-500 focus:ring-2 focus:ring-red-500'
                  : 'border-zinc-700 focus:ring-2 focus:ring-emerald-400'
              }`}
            />
          </div>

          {/* Remember Me Checkbox */}
          <div className="flex items-center">
            <input
              id="remember-me"
              type="checkbox"
              checked={rememberMe}
              onChange={(e) => setRememberMe(e.target.checked)}
              className="w-4 h-4 rounded border-zinc-700 bg-zinc-900 text-emerald-500 focus:ring-emerald-400 cursor-pointer"
            />
            <label htmlFor="remember-me" className="ml-2 text-xs text-zinc-300 cursor-pointer">
              Remember me for 30 days
            </label>
          </div>

          <button
  type="submit"
  disabled={isLoading}
  className="w-full mt-2 bg-emerald-500 hover:bg-emerald-400 disabled:opacity-60 disabled:cursor-not-allowed text-zinc-950 font-bold py-3 rounded-xl transition text-sm shadow-md shadow-emerald-500/25 cursor-pointer active:scale-[0.99]"
>
  {isLoading ? "Logging in..." : "Log In"}
</button>
        </form>

        {/* Link to Separate Sign Up Page */}
        <div className="mt-6 text-center text-sm text-zinc-400 pt-5 border-t border-zinc-700/60">
          <p>
            Don&apos;t have an account?{' '}
            <Link
              to="/signup"
              className="text-emerald-400 font-semibold hover:underline cursor-pointer ml-1"
            >
              Sign Up
            </Link>
          </p>
        </div>

      </div>
    </div>
  );
}

