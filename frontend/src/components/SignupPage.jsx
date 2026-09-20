import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Logo from './Logo';
import axios from 'axios';

export default function SignupPage() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [message, setMessage] = useState('');
  const [isError, setIsError] = useState(false);

  const handleSignup = async (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      setMessage('Passwords do not match. Please re-enter.');
      setIsError(true);
      return;
    }
try {
    const  response = await axios.post(
      "http://localhost:8000/signup",
      {
        name,
        email,
        password,
        confirmpassword: confirmPassword
      },
      {
        withCredentials: true
      }
    );
    console.log(response.data);

    setIsError(false);
    setMessage(`Account created for ${name || email}! Welcome to WalletWave.`);
  }catch (error) {

    console.log(error);

    setIsError(true);

    setMessage(
      error.response?.data?.message || "Something went wrong"
    );
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

      {/* Sign Up Card */}
      <div className="max-w-md mx-auto w-full bg-zinc-800/90 p-6 sm:p-8 rounded-2xl border border-zinc-700/80 shadow-2xl">
        
        {/* Header with Logo */}
        <div className="flex flex-col items-center mb-7">
          <Link to="/" className="cursor-pointer">
            <Logo size="large" />
          </Link>
          <h1 className="text-2xl font-bold text-white mt-4 tracking-tight">
            Create an Account
          </h1>
          <p className="text-sm text-zinc-400 mt-1 text-center">
            Sign up in seconds to start tracking spending and building smart savings habits.
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

        {/* Sign Up Form */}
        <form onSubmit={handleSignup} className="space-y-4">
          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-zinc-300 mb-1.5">
              Full Name
            </label>
            <input
              type="text"
              required
              placeholder="Alex Morgan"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full px-3.5 py-2.5 bg-zinc-900 border border-zinc-700 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-400 text-sm text-white placeholder-zinc-500"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-zinc-300 mb-1.5">
              Email Address
            </label>
            <input
              type="email"
              required
              placeholder="alex@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-3.5 py-2.5 bg-zinc-900 border border-zinc-700 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-400 text-sm text-white placeholder-zinc-500"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-zinc-300 mb-1.5">
              Password
            </label>
            <input
              type="password"
              required
              placeholder="••••••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-3.5 py-2.5 bg-zinc-900 border border-zinc-700 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-400 text-sm text-white placeholder-zinc-500"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-zinc-300 mb-1.5">
              Confirm Password
            </label>
            <input
              type="password"
              required
              placeholder="••••••••••••"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              className="w-full px-3.5 py-2.5 bg-zinc-900 border border-zinc-700 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-400 text-sm text-white placeholder-zinc-500"
            />
          </div>

          <button
            type="submit"
            className="w-full mt-2 bg-emerald-500 hover:bg-emerald-400 text-zinc-950 font-bold py-3 rounded-xl transition text-sm shadow-md shadow-emerald-500/25 cursor-pointer active:scale-[0.99]"
          >
            Create Free Account
          </button>
        </form>

        {/* Link to Separate Login Page */}
        <div className="mt-6 text-center text-sm text-zinc-400 pt-5 border-t border-zinc-700/60">
          <p>
            Already have an account?{' '}
            <Link
              to="/login"
              className="text-emerald-400 font-semibold hover:underline cursor-pointer ml-1"
            >
              Log In
            </Link>
          </p>
        </div>

      </div>
    </div>
  );
}

