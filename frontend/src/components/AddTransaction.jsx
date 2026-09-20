import React, { useState } from "react";
import axios from "axios";
import { API_URL } from "../api";

const AddTransaction = ({ onTransactionAdded }) =>  {
  const [title, setTitle] = useState("");
  const [amount, setAmount] = useState("");
  const [type, setType] = useState("expense");
  const [category, setCategory] = useState("Food");
const [date, setDate] = useState(
  new Date().toISOString().split("T")[0]
);
  const [message, setMessage] = useState("");
  const [isError, setIsError] = useState(false);

  const handleSubmit = async (e) => {
  e.preventDefault();

  // Frontend validation
  if (!title.trim()) {
    setIsError(true);
    setMessage("Title is required");
    return;
  }

  if (title.trim().length > 100) {
    setIsError(true);
    setMessage("Title cannot exceed 100 characters");
    return;
  }

  const numericAmount = Number(amount);

  if (!amount || !Number.isFinite(numericAmount) || numericAmount <= 0) {
    setIsError(true);
    setMessage("Amount must be greater than 0");
    return;
  }

  if (!["income", "expense"].includes(type)) {
    setIsError(true);
    setMessage("Please select a valid transaction type");
    return;
  }

  if (!category.trim()) {
    setIsError(true);
    setMessage("Category is required");
    return;
  }

  try {
    const response = await axios.post(
      `${API_URL}/transaction/add`,
      {
        title: title.trim(),
        amount: numericAmount,
        type,
        category,
        date,
      },
      {
        withCredentials: true,
      }
    );

    console.log(response.data);

    setIsError(false);
    setMessage("Transaction added successfully!");

    if (onTransactionAdded) {
      onTransactionAdded();
    }

    setTitle("");
    setAmount("");
    setType("expense");
    setCategory("Food");
    setDate(new Date().toISOString().split("T")[0]);
  } catch (error) {
    console.log(error);

    setIsError(true);
    setMessage(
      error.response?.data?.message || "Something went wrong"
    );
  }
};
  return (
    <div className="min-h-screen bg-zinc-900 text-white p-6">
      <div className="max-w-xl mx-auto">
        <h1 className="text-3xl font-bold mb-2">
          Add Transaction
        </h1>

        <p className="text-zinc-400 mb-8">
          Add your income or expense
        </p>

        <form
          onSubmit={handleSubmit}
          className="bg-zinc-800 border border-zinc-700 rounded-2xl p-6 space-y-5"
        >
          {/* Title */}
          <div>
            <label className="block text-sm text-zinc-300 mb-2">
              Title
            </label>

            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="e.g. Food, Salary, Shopping"
              className="w-full bg-zinc-900 border border-zinc-700 rounded-lg px-4 py-3 outline-none focus:border-teal-500"
              
            />
          </div>

          {/* Amount */}
          <div>
            <label className="block text-sm text-zinc-300 mb-2">
              Amount
            </label>

            <input
              type="number"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              placeholder="Enter amount"
              className="w-full bg-zinc-900 border border-zinc-700 rounded-lg px-4 py-3 outline-none focus:border-teal-500"
              
            />
          </div>

          {/* Type */}
          <div>
            <label className="block text-sm text-zinc-300 mb-2">
              Type
            </label>

            <select
              value={type}
              onChange={(e) => setType(e.target.value)}
              className="w-full bg-zinc-900 border border-zinc-700 rounded-lg px-4 py-3 outline-none focus:border-teal-500"
            >
              <option value="expense">Expense</option>
              <option value="income">Income</option>
            </select>
          </div>

          {/* Category */}
          <div>
            <label className="block text-sm text-zinc-300 mb-2">
              Category
            </label>

            <select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="w-full bg-zinc-900 border border-zinc-700 rounded-lg px-4 py-3 outline-none focus:border-teal-500"
            >
              <option value="Food">Food</option>
              <option value="Shopping">Shopping</option>
              <option value="Bills">Bills</option>
              <option value="Transport">Transport</option>
              <option value="Entertainment">Entertainment</option>
              <option value="Health">Health</option>
              <option value="Education">Education</option>
              <option value="Salary">Salary</option>
              <option value="Other">Other</option>
            </select>
          </div>

          {/* Date */}
          <div>
            <label className="block text-sm text-zinc-300 mb-2">
              Date
            </label>

            <input
              type="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              className="w-full bg-zinc-900 border border-zinc-700 rounded-lg px-4 py-3 outline-none focus:border-teal-500"
            />
          </div>

          {/* Button */}
          <button
            type="submit"
            className="w-full bg-teal-500 hover:bg-teal-400 text-zinc-950 font-semibold py-3 rounded-lg transition"
          >
            Add Transaction
          </button>

          {/* Message */}
          {message && (
            <p
              className={`text-center text-sm ${
                isError ? "text-red-400" : "text-green-400"
              }`}
            >
              {message}
            </p>
          )}
        </form>
      </div>
    </div>
  );
};

export default AddTransaction;