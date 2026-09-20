import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
  LayoutDashboard,
  CreditCard,
  BarChart3,
  Target,
  User,
  LogOut,
  Bell,
  Receipt,
  TrendingUp,
  TrendingDown,
  Wallet,
  Utensils,
  Briefcase,
  ShoppingBag,
  Menu,
  X,
  Plus,
  ArrowUpRight,
  ArrowDownLeft
} from 'lucide-react';
import Logo from './Logo';
import AddTransaction from "./AddTransaction";
import Transactions from './Transactions';
import axios from "axios";


export default function Dashboard() {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('dashboard');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [timeRange, setTimeRange] = useState('This Week');
  const [isEditingProfile, setIsEditingProfile] = useState(false);
const [profileName, setProfileName] = useState("");
const [updatingProfile, setUpdatingProfile] = useState(false);
const [profileMessage, setProfileMessage] = useState("");
  const [summary, setSummary] = useState({
  totalIncome: 0,
  totalExpenses: 0,
  balance: 0,
});
const [recentTransactions, setRecentTransactions] = useState([]);
const [allTransactions, setAllTransactions] = useState([]);
const [user, setUser] = useState(null);
const refreshDashboard = async () => {
  try {
    const [summaryResponse, transactionsResponse] = await Promise.all([
      axios.get("http://localhost:8000/transaction/summary", {
        withCredentials: true,
      }),
      axios.get("http://localhost:8000/transaction/all", {
        withCredentials: true,
      }),
    ]);

    setSummary(summaryResponse.data);
    setAllTransactions(transactionsResponse.data.transactions);
    setRecentTransactions(
      transactionsResponse.data.transactions.slice(0, 3)
    );
  } catch (error) {
    console.log(error);
  }
};
useEffect(() => {
  const fetchUser = async () => {
    try {
      const response = await axios.get(
        "http://localhost:8000/me",
        {
          withCredentials: true,
        }
      );

      setUser(response.data.user);
    } catch (error) {
      console.log(error);
    }
  };

  fetchUser();
}, []);

useEffect(() => {
  const fetchSummary = async () => {
    try {
      const response = await axios.get(
        "http://localhost:8000/transaction/summary",
        {
          withCredentials: true,
        }
      );

      setSummary(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  fetchSummary();
}, []);
useEffect(() => {
  const fetchRecentTransactions = async () => {
    try {
      const response = await axios.get(
        "http://localhost:8000/transaction/all",
        {
          withCredentials: true,
        }
      );

      setAllTransactions(response.data.transactions);
      setRecentTransactions(response.data.transactions.slice(0, 3));
    } catch (error) {
      console.log(error);
    }
  };

  fetchRecentTransactions();
}, []);

  // Sidebar navigation items from mockup
  const navItems = [
    { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { id: 'transactions', label: 'Transactions', icon: CreditCard },
    { id: 'analytics', label: 'Analytics', icon: BarChart3 },
    { id: 'budgets', label: 'Budgets', icon: Target },
    { id: 'profile', label: 'Profile', icon: User },
  ];

  // Weekly spending chart sample data (pure CSS/Tailwind, simple & clean)
const chartData = (() => {
  const today = new Date();

  // =========================
  // THIS WEEK
  // =========================
  if (timeRange === "This Week") {
    const days = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];

    const monday = new Date(today);
    const currentDay = monday.getDay();
    const difference = currentDay === 0 ? -6 : 1 - currentDay;

    monday.setDate(monday.getDate() + difference);
    monday.setHours(0, 0, 0, 0);

    const dailyData = days.map((dayName, index) => {
      const targetDate = new Date(monday);
      targetDate.setDate(monday.getDate() + index);

      const amount = allTransactions
        .filter((transaction) => {
          if (transaction.type !== "expense") {
            return false;
          }

          const transactionDate = new Date(transaction.date);

          return (
            transactionDate.getFullYear() === targetDate.getFullYear() &&
            transactionDate.getMonth() === targetDate.getMonth() &&
            transactionDate.getDate() === targetDate.getDate()
          );
        })
        .reduce(
          (total, transaction) => total + Number(transaction.amount),
          0
        );

      return {
        day: dayName,
        amount,
      };
    });

    const maxAmount = Math.max(
      ...dailyData.map((item) => item.amount),
      1
    );

    const chartMax = maxAmount * 1.25;

    return dailyData.map((item) => ({
      ...item,
      height:
        item.amount === 0
          ? "0%"
          : `${Math.max((item.amount / chartMax) * 100, 8)}%`,
    }));
  }

  // =========================
  // THIS MONTH
  // =========================
  const currentMonth = today.getMonth();
  const currentYear = today.getFullYear();

  const weeks = [
    { label: "Week 1", start: 1, end: 7 },
    { label: "Week 2", start: 8, end: 14 },
    { label: "Week 3", start: 15, end: 21 },
    { label: "Week 4", start: 22, end: 28 },
    { label: "Week 5", start: 29, end: 31 },
  ];

  const monthlyData = weeks.map((week) => {
    const amount = allTransactions
      .filter((transaction) => {
        if (transaction.type !== "expense") {
          return false;
        }

        const transactionDate = new Date(transaction.date);

        const year = transactionDate.getFullYear();
        const month = transactionDate.getMonth();
        const day = transactionDate.getDate();

        return (
          year === currentYear &&
          month === currentMonth &&
          day >= week.start &&
          day <= week.end
        );
      })
      .reduce(
        (total, transaction) => total + Number(transaction.amount),
        0
      );

    return {
      day: week.label,
      amount,
    };
  });

  const maxAmount = Math.max(
    ...monthlyData.map((item) => item.amount),
    1
  );

  const chartMax = maxAmount * 1.25;

  return monthlyData.map((item) => ({
    ...item,
    height:
      item.amount === 0
        ? "0%"
        : `${Math.max((item.amount / chartMax) * 100, 8)}%`,
  }));
})();
 


 const handleLogout = async () => {
  try {
    await axios.post(
      "http://localhost:8000/logout",
      {},
      {
        withCredentials: true,
      }
    );

    navigate("/login");
  } catch (error) {
    console.log(error);
  }
};
const handleUpdateProfile = async () => {
  if (!profileName.trim()) {
    setProfileMessage("Name cannot be empty.");
    return;
  }

  setUpdatingProfile(true);
  setProfileMessage("");

  try {
    const response = await axios.put(
      "http://localhost:8000/profile/update",
      {
        name: profileName.trim(),
      },
      {
        withCredentials: true,
      }
    );

    setUser(response.data.user);
    setIsEditingProfile(false);
    setProfileName("");
    setProfileMessage("Profile updated successfully.");

    setTimeout(() => {
      setProfileMessage("");
    }, 3000);
  } catch (error) {
    console.error("Profile update failed:", error);

    setProfileMessage(
      error.response?.data?.message || "Failed to update profile."
    );
  } finally {
    setUpdatingProfile(false);
  }
};

  return (
    <div className="min-h-screen bg-zinc-900 text-zinc-100 flex flex-col">
      {/* ──────────────── Top Header Bar ──────────────── */}
      <header className="h-16 border-b border-zinc-800 bg-zinc-900/95 px-4 sm:px-6 flex items-center justify-between sticky top-0 z-40 backdrop-blur-md">
        
        {/* Left: Mobile Toggle & Brand Logo */}
        <div className="flex items-center gap-3">
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2 rounded-lg text-zinc-400 hover:text-white hover:bg-zinc-800 transition cursor-pointer"
            aria-label="Toggle navigation"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
          
         <Link to="/dashboard" className="cursor-pointer">
  <Logo />
</Link>
        </div>

        {/* Right: Notifications & Profile */}
        <div className="flex items-center gap-3 sm:gap-4">
          {/* Notifications Button */}
          <button
            type="button"
            className="relative p-2 rounded-xl text-zinc-300 hover:text-white hover:bg-zinc-800 transition cursor-pointer"
            aria-label="Notifications"
          >
            <Bell className="w-5 h-5" />
            <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
          </button>

          {/* Profile User Chip */}
          <div className="flex items-center gap-2.5 pl-2 sm:border-l sm:border-zinc-800 cursor-pointer">
           <div className="w-9 h-9 rounded-full bg-emerald-500/20 border border-emerald-500/40 text-emerald-300 font-bold flex items-center justify-center text-sm">
  {user?.name?.charAt(0).toUpperCase() || "U"}
</div>

<div className="hidden sm:block text-left">
  <div className="text-sm font-semibold text-white leading-tight">
    {user?.name || "User"}
  </div>

  <div className="text-[11px] text-zinc-400">
    {user?.email || "Loading..."}
  </div>
</div>
          </div>
        </div>
      </header>

      {/* ──────────────── Main Layout Area (Sidebar + Content) ──────────────── */}
      <div className="flex-1 flex overflow-hidden">
        
        {/* ── Left Sidebar (Desktop) ── */}
        <aside className="w-64 border-r border-zinc-800 bg-zinc-900/60 p-4 hidden md:flex flex-col justify-between shrink-0">
          <div className="space-y-1.5">
            <div className="text-[11px] font-semibold uppercase tracking-wider text-zinc-500 px-3 mb-2">
              Menu
            </div>
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = activeTab === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => setActiveTab(item.id)}
                  className={`w-full flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-sm font-medium transition cursor-pointer ${
                    isActive
                      ? 'bg-emerald-500/15 text-emerald-400 border border-emerald-500/30 font-semibold shadow-sm'
                      : 'text-zinc-400 hover:text-white hover:bg-zinc-800/60'
                  }`}
                >
                  <Icon className="w-4 h-4 shrink-0" />
                  <span>{item.label}</span>
                </button>
              );
            })}
            <button
  onClick={() => setActiveTab("add-transaction")}
  className="w-full flex items-center justify-center gap-2 px-4 py-3 mt-4 rounded-xl bg-emerald-500 text-zinc-950 text-sm font-bold hover:bg-emerald-400 transition cursor-pointer shadow-lg shadow-emerald-500/10"
>
  <Plus className="w-4 h-4" />
  <span>Add Transaction</span>
</button>
          </div>

          {/* Logout Button */}
          <div className="pt-4 border-t border-zinc-800/80">
            <button
              onClick={handleLogout}
              className="w-full flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-sm font-medium text-zinc-400 hover:text-rose-400 hover:bg-rose-950/30 transition cursor-pointer"
            >
              <LogOut className="w-4 h-4 shrink-0" />
              <span>Logout</span>
            </button>
          </div>
        </aside>

        {/* ── Mobile Drawer (When hamburger is clicked) ── */}
        {mobileMenuOpen && (
          <div className="fixed inset-0 top-16 bg-zinc-950/80 z-30 md:hidden backdrop-blur-sm flex">
            <div className="w-64 bg-zinc-900 border-r border-zinc-800 p-4 flex flex-col justify-between h-full">
              <div className="space-y-1.5">
                <div className="text-[11px] font-semibold uppercase tracking-wider text-zinc-500 px-3 mb-2">
                  Navigation
                </div>
                {navItems.map((item) => {
                  const Icon = item.icon;
                  const isActive = activeTab === item.id;
                  return (
                    <button
                      key={item.id}
                      onClick={() => {
                        setActiveTab(item.id);
                        setMobileMenuOpen(false);
                      }}
                      className={`w-full flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-sm font-medium transition cursor-pointer ${
                        isActive
                          ? 'bg-emerald-500/15 text-emerald-400 border border-emerald-500/30 font-semibold'
                          : 'text-zinc-400 hover:text-white hover:bg-zinc-800/60'
                      }`}
                    >
                      <Icon className="w-4 h-4 shrink-0" />
                      <span>{item.label}</span>
                    </button>
                  );
                })}
              </div>

              <div className="pt-4 border-t border-zinc-800">
                <button
                  onClick={handleLogout}
                  className="w-full flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-sm font-medium text-rose-400 hover:bg-rose-950/30 transition cursor-pointer"
                >
                  <LogOut className="w-4 h-4 shrink-0" />
                  <span>Logout</span>
                </button>
              </div>
            </div>
            {/* Backdrop click to close */}
            <div className="flex-1" onClick={() => setMobileMenuOpen(false)} />
          </div>
        )}

        {/* ── Main Content Area ── */}
        <main className="flex-1 min-w-0 p-4 sm:p-6 lg:p-8 overflow-y-auto">

   {activeTab === "transactions" ? (
  <Transactions onTransactionDeleted={refreshDashboard} />
) : activeTab === "add-transaction" ? (
  <AddTransaction onTransactionAdded={refreshDashboard} />
) : activeTab === "analytics" ? (
  <div className="flex items-center justify-center min-h-[60vh]">
    <div className="text-center max-w-md">
      <div className="text-5xl mb-5">📊</div>

      <h2 className="text-2xl font-bold text-white">
        Analytics Coming Soon
      </h2>

      <p className="text-zinc-400 mt-3">
        We're working on powerful insights to help you understand your spending better.
      </p>

      <span className="inline-block mt-5 px-4 py-2 rounded-full bg-emerald-950/50 border border-emerald-800/50 text-emerald-400 text-sm">
        Coming Soon
      </span>
    </div>
  </div>
) : activeTab === "budgets" ? (
  <div className="flex items-center justify-center min-h-[60vh]">
    <div className="text-center max-w-md">
      <div className="text-5xl mb-5">🎯</div>

      <h2 className="text-2xl font-bold text-white">
        Budgets Coming Soon
      </h2>

      <p className="text-zinc-400 mt-3">
        Budget planning and tracking will be available here soon.
      </p>

      <span className="inline-block mt-5 px-4 py-2 rounded-full bg-emerald-950/50 border border-emerald-800/50 text-emerald-400 text-sm">
        Coming Soon
      </span>
    </div>
  </div>
) : activeTab === "profile" ? (
  <div className="max-w-3xl mx-auto">
    <div className="mb-8">
      <h1 className="text-2xl sm:text-3xl font-bold text-white">
        Profile
      </h1>
      <p className="text-zinc-400 mt-2">
        Manage your account information.
      </p>
    </div>

    <div className="bg-zinc-800/50 border border-zinc-700 rounded-2xl overflow-hidden">

      {/* Profile Header */}
<div className="p-6 sm:p-8 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-5 border-b border-zinc-700">
  
  <div className="flex items-center gap-5">
    <div className="w-20 h-20 rounded-full bg-emerald-500/20 border border-emerald-500/30 flex items-center justify-center">
      <User className="w-10 h-10 text-emerald-400" />
    </div>

    <div>
      <h2 className="text-xl sm:text-2xl font-semibold text-white">
        {user?.name}
      </h2>

      <p className="text-zinc-400 mt-1">
        {user?.email}
      </p>
    </div>
  </div>

  <button
    onClick={() => {
      setProfileName(user?.name || "");
      setIsEditingProfile(true);
    }}
    className="flex items-center justify-center gap-2 px-4 py-2 rounded-xl bg-zinc-700 text-white hover:bg-zinc-600 transition"
  >
    <User className="w-4 h-4" />
    Edit Profile
  </button>

</div>

      {/* Account Information */}
      <div className="p-6 sm:p-8">
        <h3 className="text-lg font-semibold text-white mb-5">
          Account Information
        </h3>

        <div className="space-y-5">
        <div>
         <label className="block text-sm text-zinc-400 mb-2">
       Full Name
       </label>

    {isEditingProfile ? (
      <input
        type="text"
        value={profileName}
        onChange={(e) => setProfileName(e.target.value)}
        className="w-full px-4 py-3 rounded-xl bg-zinc-900/50 border border-zinc-700 text-white outline-none focus:border-emerald-500 transition"
        placeholder="Enter your name"
      />
   ) : (
  <div className="px-4 py-3 rounded-xl bg-zinc-900/50 border border-zinc-700 text-zinc-400">
    {user?.name}
  </div>
)}
  </div>

  <div>
    <label className="block text-sm text-zinc-400 mb-2">
      Email Address
    </label>

    <div className="px-4 py-3 rounded-xl bg-zinc-900/50 border border-zinc-700 text-zinc-400">
      {user?.email}
    </div>
  </div>
</div>
{isEditingProfile && (
  <div className="flex flex-col gap-3 mt-6">

    <div className="flex gap-3">
      <button
        onClick={() => {
          setIsEditingProfile(false);
          setProfileName("");
          setProfileMessage("");
        }}
        disabled={updatingProfile}
        className="px-5 py-3 rounded-xl bg-zinc-700 text-white hover:bg-zinc-600 transition disabled:opacity-50 disabled:cursor-not-allowed"
      >
        Cancel
      </button>

      <button
        onClick={handleUpdateProfile}
        disabled={updatingProfile}
        className="px-5 py-3 rounded-xl bg-emerald-500 text-zinc-950 font-semibold hover:bg-emerald-400 transition disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {updatingProfile ? "Saving..." : "Save Changes"}
      </button>
    </div>

    {profileMessage && (
      <p
        className={`text-sm ${
          profileMessage.includes("successfully")
            ? "text-emerald-400"
            : "text-rose-400"
        }`}
      >
        {profileMessage}
      </p>
    )}

  </div>
)}




        {/* Logout */}
        <div className="border-t border-zinc-700 mt-8 pt-6">
          <button
            onClick={handleLogout}
            className="flex items-center justify-center gap-2 px-5 py-3 rounded-xl bg-rose-500/10 border border-rose-500/20 text-rose-400 hover:bg-rose-500/20 transition"
          >
            <LogOut className="w-5 h-5" />
            Logout
          </button>
        </div>
      </div>
    </div>
  </div>
) : (
  
  <>
  
                {/* dashboard content */}
                   
          
          {/* Welcome Greeting Header */}
          <div className="mb-6 sm:mb-8">
  <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
   Your Financial Space
  </h1>

  <p className="text-sm sm:text-base text-zinc-400 mt-1">
    Track, manage, and understand your money with ease
  </p>
</div>

          {/* ── 3 Summary Metric Cards (Balance, Income, Expenses) ── */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-5 mb-8">
            
            {/* Card 1: Balance */}
            <div className="bg-zinc-800/80 p-5 rounded-2xl border border-zinc-700/80 hover:border-emerald-500/40 transition shadow-sm">
              <div className="flex items-center justify-between text-zinc-400 text-xs font-semibold uppercase tracking-wider mb-2">
                <span>Balance</span>
                <div className="w-8 h-8 rounded-lg bg-zinc-900 flex items-center justify-center text-emerald-400">
                  <Wallet className="w-4 h-4" />
                </div>
              </div>
              <div className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
                ₹{summary.balance.toLocaleString("en-IN")}
              </div>
              <div className="text-xs text-emerald-400 font-medium mt-2 flex items-center gap-1">
                <ArrowUpRight className="w-3.5 h-3.5" />
                <span>+₹2,400 this month</span>
              </div>
            </div>

            {/* Card 2: Income */}
            <div className="bg-zinc-800/80 p-5 rounded-2xl border border-zinc-700/80 hover:border-emerald-500/40 transition shadow-sm">
              <div className="flex items-center justify-between text-zinc-400 text-xs font-semibold uppercase tracking-wider mb-2">
                <span>Income</span>
                <div className="w-8 h-8 rounded-lg bg-emerald-950/80 border border-emerald-800/50 flex items-center justify-center text-emerald-400">
                  <TrendingUp className="w-4 h-4" />
                </div>
              </div>
              <div className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
                ₹{summary.totalIncome.toLocaleString("en-IN")}
              </div>
              <div className="text-xs text-emerald-400 font-medium mt-2 flex items-center gap-1">
                <ArrowDownLeft className="w-3.5 h-3.5" />
                <span>Received on schedule</span>
              </div>
            </div>

            {/* Card 3: Expenses */}
            <div className="bg-zinc-800/80 p-5 rounded-2xl border border-zinc-700/80 hover:border-emerald-500/40 transition shadow-sm">
              <div className="flex items-center justify-between text-zinc-400 text-xs font-semibold uppercase tracking-wider mb-2">
                <span>Expenses</span>
                <div className="w-8 h-8 rounded-lg bg-rose-950/80 border border-rose-800/50 flex items-center justify-center text-rose-400">
                  <TrendingDown className="w-4 h-4" />
                </div>
              </div>
              <div className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
                ₹{summary.totalExpenses.toLocaleString("en-IN")}
              </div>
              <div className="text-xs text-zinc-400 font-medium mt-2">
                <span>36.5% of total income</span>
              </div>
            </div>

          </div>

          {/* ── Spending Overview (Simple & Clean Chart) ── */}
          <div className="bg-zinc-800/80 p-4 sm:p-6 rounded-2xl border border-zinc-700/80 mb-8 overflow-hidden">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-6">
              <div>
                <h2 className="text-lg font-bold text-white tracking-tight">
                  Spending Overview
                </h2>
                <p className="text-xs text-zinc-400">
  {timeRange === "This Week"
    ? `This Week · ${(() => {
        const today = new Date();
        const day = today.getDay();
        const difference = day === 0 ? -6 : 1 - day;

        const monday = new Date(today);
        monday.setDate(today.getDate() + difference);

        const sunday = new Date(monday);
        sunday.setDate(monday.getDate() + 6);

        const formatDate = (date) =>
          date.toLocaleDateString("en-IN", {
            day: "numeric",
            month: "short",
          });

        return `${formatDate(monday)} – ${formatDate(sunday)}, ${sunday.getFullYear()}`;
      })()}`
    : new Date().toLocaleDateString("en-IN", {
        month: "long",
        year: "numeric",
      })}
</p>
              </div>

              {/* Simple Toggle Pills */}
              <div className="flex items-center self-start sm:self-auto bg-zinc-900 p-1 rounded-xl border border-zinc-800 text-xs">
                {['This Week', 'Monthly'].map((range) => (
                  <button
                    key={range}
                    onClick={() => setTimeRange(range)}
                    className={`px-3 py-1 rounded-lg font-medium transition cursor-pointer ${
                      timeRange === range
                        ? 'bg-emerald-500 text-zinc-950 font-bold'
                        : 'text-zinc-400 hover:text-white'
                    }`}
                  >
                    {range}
                  </button>
                ))}
              </div>
            </div>

            {/* Simple Clean Bar Chart (Pure CSS/Tailwind) */}
            <div className="h-48 sm:h-56 flex items-end justify-between gap-1 sm:gap-2 md:gap-4 lg:gap-6 pt-8 pb-2 px-1 sm:px-2 md:px-4 border-b border-zinc-700/60 w-full">
              {chartData.map((item) => (
                <div key={item.day} className="flex-1 min-w-0 flex flex-col items-center gap-2 h-full justify-end group cursor-pointer relative">
                  {/* Tooltip on hover (absolutely positioned to prevent column widening) */}
                  <div className="absolute -top-7 pointer-events-none whitespace-nowrap text-[10px] sm:text-[11px] font-semibold text-emerald-300 opacity-0 group-hover:opacity-100 transition-opacity bg-zinc-900 px-1.5 py-0.5 rounded border border-zinc-700 shadow-md z-10">
                    ₹{item.amount.toLocaleString("en-IN")}
                  </div>
                  {/* Bar */}
                  <div className="w-full max-w-7 sm:max-w-34px md:max-w-40px bg-zinc-900/80 rounded-t-lg overflow-hidden flex items-end h-full">
                    <div
                      style={{ height: item.height }}
                      className="w-full bg-linear-to-t from-emerald-500 to-teal-300 rounded-t-lg group-hover:from-emerald-400 group-hover:to-teal-200 transition-all duration-300"
                    />
                  </div>
                  {/* Day Label */}
                  <span className="text-[11px] sm:text-xs text-zinc-400 group-hover:text-white font-medium transition-colors truncate">
                    {item.day}
                  </span>
                </div>
              ))}
            </div>

            <div className="flex flex-wrap items-center justify-between gap-2 text-xs text-zinc-400 pt-3">
<span>
  Total spent{" "}
  {timeRange === "This Week" ? "this week" : "this month"}:{" "}
  <strong className="text-white">
    ₹{chartData
      .reduce((total, item) => total + item.amount, 0)
      .toLocaleString("en-IN")}
  </strong>
</span>

<span className="text-emerald-400 font-medium">
  Daily average: ₹
  {Math.round(
    chartData.reduce((total, item) => total + item.amount, 0) /
      (timeRange === "This Week"
        ? 7
        : new Date(
            new Date().getFullYear(),
            new Date().getMonth() + 1,
            0
          ).getDate())
  ).toLocaleString("en-IN")}
</span>
</div>
          </div>

          {/* ── Recent Transactions ── */}
          <div className="bg-zinc-800/80 p-5 sm:p-6 rounded-2xl border border-zinc-700/80">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-bold text-white tracking-tight">
                Recent Transactions
              </h2>
              <button 
                type="button" 
                onClick={() => setActiveTab("transactions")}
                className="text-xs font-semibold text-emerald-400 hover:text-emerald-300 hover:underline cursor-pointer"
              >
                View All
              </button>
            </div>

            <div className="divide-y divide-zinc-700/60">
              {recentTransactions.map((tx) => {
                const isPositive = tx.type === "income";

const Icon =
  tx.category?.toLowerCase() === "food"
    ? Utensils
    : tx.category?.toLowerCase() === "shopping"
    ? ShoppingBag
    : tx.category?.toLowerCase() === "salary"
    ? Briefcase
    : Receipt;
                return (
                  <div
                    key={tx._id}
                    className="py-3.5 first:pt-1 last:pb-1 flex items-center justify-between hover:bg-zinc-800/40 px-2 rounded-xl transition cursor-pointer"
                  >
                    {/* Left: Icon & Description */}
                    <div className="flex items-center gap-3 sm:gap-3.5">
                     <div
  className={`w-10 h-10 rounded-xl border flex items-center justify-center shrink-0 ${
    isPositive
      ? "text-emerald-400 bg-emerald-950/60 border-emerald-800/50"
      : "text-amber-400 bg-amber-950/60 border-amber-800/50"
  }`}
>
                        <Icon className="w-5 h-5" />
                      </div>
                      <div>
                        <div className="text-sm font-semibold text-white tracking-tight">
                          {tx.title}
                        </div>
                        <div className="text-xs text-zinc-400">
                          {tx.category} •{" "}
{new Date(tx.date).toLocaleDateString("en-IN", {
  day: "2-digit",
  month: "short",
  year: "numeric",
})}
                        </div>
                      </div>
                    </div>

                    {/* Right: Amount */}
                    <div className={`text-sm sm:text-base font-bold tracking-tight ${
                      isPositive ? 'text-emerald-400' : 'text-zinc-200'
                    }`}>
                      {isPositive ? "+" : "-"}₹
                        {Number(tx.amount).toLocaleString("en-IN")}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
            </>
        )}
        </main>
      </div>
    </div>
  );
}
