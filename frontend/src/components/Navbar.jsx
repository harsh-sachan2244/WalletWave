import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { Menu, X } from 'lucide-react';
import Logo from './Logo';
import axios from 'axios';
import { API_URL } from "../api";

export default function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('');
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  console.log("Navbar auth:", isAuthenticated);

  // Track active section on scroll
  useEffect(() => {
    if (location.pathname !== '/') {
      setActiveSection('');
      return;
    }

    const handleScroll = () => {
      const sections = ['features', 'how-it-works', 'about'];
      const scrollPosition = window.scrollY + 160; // offset for fixed navbar + breathing room

      let current = '';
      for (const sectionId of sections) {
        const el = document.getElementById(sectionId);
        if (el) {
          const top = el.offsetTop;
          const height = el.offsetHeight;
          if (scrollPosition >= top && scrollPosition < top + height) {
            current = sectionId;
            break;
          }
        }
      }

      setActiveSection(current);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();

    return () => window.removeEventListener('scroll', handleScroll);
  }, [location.pathname]);

   useEffect(() => {
  const checkAuth = async () => {
    try {
      await axios.get(`${API_URL}/me`, {
        withCredentials: true,
      });

      setIsAuthenticated(true);
    } catch (error) {
      setIsAuthenticated(false);
    }
  };

  checkAuth();
}, []);

  const scrollTo = (id) => {
    setMobileMenuOpen(false);
    setActiveSection(id);
    if (location.pathname !== '/') {
      navigate('/');
      setTimeout(() => {
        const element = document.getElementById(id);
        if (element) {
          element.scrollIntoView({ behavior: 'smooth' });
        }
      }, 100);
    } else {
      const element = document.getElementById(id);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  return (
    <nav className="bg-zinc-900/95 border-b border-zinc-800/80 fixed top-0 left-0 right-0 z-50 backdrop-blur-md">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-3 flex items-center justify-between">
        
        {/* Left: Simple WalletWave Logo */}
 <div
  onClick={() => {
    console.log("LOGO CLICK:", isAuthenticated);

    if (isAuthenticated === true) {
      console.log("GOING TO DASHBOARD");
      navigate("/dashboard");
    } else {
      console.log("GOING TO LANDING");
      navigate("/");
    }

    setMobileMenuOpen(false);
  }}
  className="cursor-pointer shrink-0"
>
  <Logo />
</div>

        {/* Center: Desktop Navigation Links with Active State Colors */}
        <div className="hidden md:flex items-center space-x-2 text-sm font-medium">
          <button 
            onClick={() => scrollTo('features')}
            className={`transition-all duration-200 cursor-pointer px-3.5 py-1.5 rounded-lg ${
              activeSection === 'features'
                ? 'text-emerald-400 font-semibold bg-emerald-500/15 border border-emerald-500/30 shadow-[0_0_12px_rgba(52,211,153,0.15)]'
                : 'text-zinc-300 hover:text-white hover:bg-zinc-800/60'
            }`}
          >
            Features
          </button>
          <button 
            onClick={() => scrollTo('how-it-works')}
            className={`transition-all duration-200 cursor-pointer px-3.5 py-1.5 rounded-lg ${
              activeSection === 'how-it-works'
                ? 'text-emerald-400 font-semibold bg-emerald-500/15 border border-emerald-500/30 shadow-[0_0_12px_rgba(52,211,153,0.15)]'
                : 'text-zinc-300 hover:text-white hover:bg-zinc-800/60'
            }`}
          >
            How it Works
          </button>
          <button 
            onClick={() => scrollTo('about')}
            className={`transition-all duration-200 cursor-pointer px-3.5 py-1.5 rounded-lg ${
              activeSection === 'about'
                ? 'text-emerald-400 font-semibold bg-emerald-500/15 border border-emerald-500/30 shadow-[0_0_12px_rgba(52,211,153,0.15)]'
                : 'text-zinc-300 hover:text-white hover:bg-zinc-800/60'
            }`}
          >
            About
          </button>
        </div>

        {/* Right: Desktop Login & Sign Up */}
        <div className="hidden md:flex items-center space-x-4">
          <Link
            to="/login"
            className="text-zinc-300 hover:text-white font-medium text-sm transition cursor-pointer"
          >
            Login
          </Link>
          <Link
            to="/signup"
            className="bg-emerald-500 hover:bg-emerald-400 text-zinc-950 font-bold text-sm px-4 py-2 rounded-lg transition shadow-md shadow-emerald-500/20 cursor-pointer"
          >
            Sign Up
          </Link>
        </div>

        {/* Mobile Right: Compact Sign Up + Hamburger Menu */}
        <div className="flex md:hidden items-center space-x-2">
          <Link
            to="/signup"
            className="bg-emerald-500 hover:bg-emerald-400 text-zinc-950 font-bold text-xs px-3 py-1.5 rounded-lg transition shadow-sm cursor-pointer"
          >
            Sign Up
          </Link>
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-1.5 rounded-lg text-zinc-300 hover:text-white hover:bg-zinc-800 transition cursor-pointer"
            aria-label="Toggle Navigation Menu"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>

      </div>

      {/* Mobile Navigation Dropdown */}
      {mobileMenuOpen && (
        <div className="md:hidden border-t border-zinc-800 bg-zinc-900/98 px-4 py-4 space-y-2 backdrop-blur-xl animate-in fade-in slide-in-from-top-2 duration-200">
          <button 
            onClick={() => scrollTo('features')}
            className={`block w-full text-left py-2 px-3 rounded-lg text-sm transition cursor-pointer ${
              activeSection === 'features'
                ? 'text-emerald-400 font-semibold bg-emerald-500/15 border border-emerald-500/30'
                : 'text-zinc-200 hover:bg-zinc-800 hover:text-emerald-300'
            }`}
          >
            Features
          </button>
          <button 
            onClick={() => scrollTo('how-it-works')}
            className={`block w-full text-left py-2 px-3 rounded-lg text-sm transition cursor-pointer ${
              activeSection === 'how-it-works'
                ? 'text-emerald-400 font-semibold bg-emerald-500/15 border border-emerald-500/30'
                : 'text-zinc-200 hover:bg-zinc-800 hover:text-emerald-300'
            }`}
          >
            How it Works
          </button>
          <button 
            onClick={() => scrollTo('about')}
            className={`block w-full text-left py-2 px-3 rounded-lg text-sm transition cursor-pointer ${
              activeSection === 'about'
                ? 'text-emerald-400 font-semibold bg-emerald-500/15 border border-emerald-500/30'
                : 'text-zinc-200 hover:bg-zinc-800 hover:text-emerald-300'
            }`}
          >
            About
          </button>
          
          <div className="pt-2 mt-2 border-t border-zinc-800 flex items-center justify-between gap-3">
            <Link
              to="/login"
              onClick={() => setMobileMenuOpen(false)}
              className="w-1/2 text-center py-2 text-sm font-medium text-zinc-300 hover:text-white bg-zinc-800 rounded-lg transition cursor-pointer"
            >
              Login
            </Link>
            <Link
              to="/signup"
              onClick={() => setMobileMenuOpen(false)}
              className="w-1/2 text-center py-2 text-sm font-bold text-zinc-950 bg-emerald-500 hover:bg-emerald-400 rounded-lg transition shadow-sm cursor-pointer"
            >
              Sign Up
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
}
