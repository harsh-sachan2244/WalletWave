import React, { useEffect, useState, useRef } from "react";
import axios from "axios";
import { API_URL } from "../api";
import {
  Utensils,
  Briefcase,
  ShoppingBag,
  Receipt,
  CircleDollarSign,
  Trash2,
  Pencil,
} from "lucide-react";

const Transactions = ({ onTransactionDeleted }) => {
  const [transactions, setTransactions] = useState([]);
  const [loading, setLoading] = useState(true);
const [editingTransaction, setEditingTransaction] = useState(null);
const [updating, setUpdating] = useState(false);
const [updateMessage, setUpdateMessage] = useState("");
const editFormRef = useRef(null);
const [error, setError] = useState("");
const [deleteError, setDeleteError] = useState(null);

  useEffect(() => {
    const fetchTransactions = async () => {
      try {
        

const response = await axios.get(
  `${API_URL}/transaction/all`,
  {
    withCredentials: true,
  }
);

        setTransactions(response.data.transactions);
      } catch (error) {
  console.log(error);
  setError("Failed to load transactions. Please try again.");
} finally {
        setLoading(false);
      }
    };

    fetchTransactions();
  }, []);
const handleDelete = async (id) => {
  const confirmDelete = window.confirm(
    "Are you sure you want to delete this transaction?"
  );

  if (!confirmDelete) return;

  try {
    await axios.delete(
      `${API_URL}/transaction/delete/${id}`,
      {
        withCredentials: true,
      }
    );

    setTransactions((prevTransactions) =>
      prevTransactions.filter(
        (transaction) => transaction._id !== id
      )
    );
    if (onTransactionDeleted) {
  onTransactionDeleted();
}
  } catch (error) {
  console.log(error);
  setDeleteError(id);
}
};
const handleEdit = (transaction) => {
  setEditingTransaction(transaction);

  setTimeout(() => {
    editFormRef.current?.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });
  }, 100);
};
const handleUpdate = async () => {
  try {
    setUpdating(true);

    const response = await axios.put(
      `${API_URL}/transaction/update/${editingTransaction._id}`,
      {
        title: editingTransaction.title,
        amount: Number(editingTransaction.amount),
        type: editingTransaction.type,
        category: editingTransaction.category,
        date: editingTransaction.date,
      },
      {
        withCredentials: true,
      }
    );

    setTransactions((prevTransactions) =>
      prevTransactions.map((transaction) =>
        transaction._id === editingTransaction._id
          ? response.data.transaction
          : transaction
      )
    );

    setEditingTransaction(null);
    setUpdateMessage("Transaction updated successfully");
    setTimeout(() => {
  setUpdateMessage("");
}, 3000);

    if (onTransactionDeleted) {
      onTransactionDeleted();
    }
  } catch (error) {
  console.log(error);
  setError("Failed to update transaction. Please try again.");
} finally {
    setUpdating(false);
  }
};
  const getIcon = (category) => {
    switch (category?.toLowerCase()) {
      case "food":
      case "dining":
      case "dining & food":
        return Utensils;

      case "salary":
      case "work":
        return Briefcase;

      case "shopping":
      case "essentials":
        return ShoppingBag;

      default:
        return Receipt;
    }
  };

  const formatDate = (date) => {
  return new Date(date).toLocaleDateString("en-IN", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });
};

if (loading) {
  return (
    <div className="flex items-center justify-center min-h-screen">
      <div className="w-8 h-8 border-4 border-zinc-700 border-t-emerald-500 rounded-full animate-spin"></div>
    </div>
  );
}

  return (
    <div>
      {/* Page Header */}
      <div className="mb-8">
        <h1 className="text-2xl sm:text-3xl font-bold text-white">
          Transactions
        </h1>
        <p className="text-zinc-400 mt-1">
          View all your transactions
        </p>
      </div>
      {error && (
  <div className="mb-6 px-4 py-3 rounded-lg bg-rose-950/50 border border-rose-800/50 text-rose-400">
    {error}
  </div>
)}
      {updateMessage && (
  <div className="mb-6 px-4 py-3 rounded-lg bg-emerald-950/50 border border-emerald-800/50 text-emerald-400">
    {updateMessage}
  </div>
)}
{/* Editing Transaction */}
      {editingTransaction && (  
  <div ref={editFormRef} className="mb-6 bg-zinc-800/50 border border-zinc-700 rounded-2xl p-5">
    <div className="flex items-center justify-between mb-5">
      <h2 className="text-lg font-semibold text-white">
        Edit Transaction
      </h2>

      <button
        type="button"
        onClick={() => setEditingTransaction(null)}
        className="text-zinc-400 hover:text-white transition"
      >
        Cancel
      </button>
    </div>

    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
      {/* Title */}
      <div>
        <label className="block text-sm text-zinc-400 mb-1">
          Title
        </label>

        <input
          type="text"
          value={editingTransaction.title}
          onChange={(e) =>
            setEditingTransaction({
              ...editingTransaction,
              title: e.target.value,
            })
          }
          className="w-full bg-zinc-900 border border-zinc-700 rounded-lg px-3 py-2 text-white outline-none focus:border-emerald-500"
        />
      </div>

      {/* Amount */}
      <div>
        <label className="block text-sm text-zinc-400 mb-1">
          Amount
        </label>

        <input
          type="number"
          value={editingTransaction.amount}
          onChange={(e) =>
            setEditingTransaction({
              ...editingTransaction,
              amount:e.target.value,
            })
          }
          className="w-full bg-zinc-900 border border-zinc-700 rounded-lg px-3 py-2 text-white outline-none focus:border-emerald-500"
        />
      </div>

      {/* Type */}
      <div>
        <label className="block text-sm text-zinc-400 mb-1">
          Type
        </label>

        <select
          value={editingTransaction.type}
          onChange={(e) =>
            setEditingTransaction({
              ...editingTransaction,
              type: e.target.value,
            })
          }
          className="w-full bg-zinc-900 border border-zinc-700 rounded-lg px-3 py-2 text-white outline-none focus:border-emerald-500"
        >
          <option value="expense">Expense</option>
          <option value="income">Income</option>
        </select>
      </div>

      {/* Category */}
      <div>
        <label className="block text-sm text-zinc-400 mb-1">
          Category
        </label>

        <input
          type="text"
          value={editingTransaction.category}
          onChange={(e) =>
            setEditingTransaction({
              ...editingTransaction,
              category: e.target.value,
            })
          }
          className="w-full bg-zinc-900 border border-zinc-700 rounded-lg px-3 py-2 text-white outline-none focus:border-emerald-500"
        />
      </div>

      {/* Date */}
      <div>
        <label className="block text-sm text-zinc-400 mb-1">
          Date
        </label>

        <input
          type="date"
          value={editingTransaction.date?.slice(0, 10)}
          onChange={(e) =>
            setEditingTransaction({
              ...editingTransaction,
              date: e.target.value,
            })
          }
          className="w-full bg-zinc-900 border border-zinc-700 rounded-lg px-3 py-2 text-white outline-none focus:border-emerald-500"
        />
       
      </div>
       <div className="sm:col-span-2 flex justify-end gap-3 pt-2">
  <button
    type="button"
    onClick={() => setEditingTransaction(null)}
    className="px-4 py-2 rounded-lg text-zinc-300 bg-zinc-700 hover:bg-zinc-600 transition"
  >
    Cancel
  </button>

  <button
    type="button"
   onClick={handleUpdate}
   disabled={updating}
    className="px-4 py-2 rounded-lg text-white bg-emerald-600 hover:bg-emerald-500 transition"
  >
  {updating ? "Saving..." : "Save Changes"}
  </button>
</div>
    </div>
  </div>
)}

      {/* Transaction List */}
      <div className="space-y-6">
        {transactions.length === 0 ? (
          <div className="bg-zinc-800/50 border border-zinc-700 rounded-2xl p-10 text-center">
            <CircleDollarSign className="w-12 h-12 text-zinc-500 mx-auto mb-4" />
            <h2 className="text-lg font-semibold text-white">
              No transactions yet
            </h2>
            <p className="text-zinc-400 mt-2">
              Add your first transaction to see it here.
            </p>
          </div>
        ) : (
          
          transactions.map((transaction) => {
            const Icon = getIcon(transaction.category);
            const isIncome = transaction.type === "income";

            return (
              <div
                key={transaction._id}>
               <div className="bg-zinc-800/50 border border-zinc-700 rounded-2xl p-4 sm:p-5 flex items-center justify-between gap-4 hover:bg-zinc-800 transition">
              
                {/* Left */}
                <div className="flex items-center gap-4 min-w-0">
                  <div
                    className={`w-11 h-11 rounded-xl flex items-center justify-center shrink-0 ${
                      isIncome
                        ? "text-emerald-400 bg-emerald-950/60 border border-emerald-800/50"
                        : "text-amber-400 bg-amber-950/60 border border-amber-800/50"
                    }`}
                  >
                    <Icon size={20} />
                  </div>

                  <div className="min-w-0">
                    <h3 className="text-white font-medium truncate">
                      {transaction.title}
                    </h3>

                    <p className="text-sm text-zinc-400">
                      {transaction.category}
                    </p>

                    <p className="text-xs text-zinc-500 mt-1">
                      {formatDate(transaction.date)}
                    </p>
                  </div>
                </div>

                {/* Amount */}
                {/* Amount + Delete */}
<div className="flex items-center gap-3">
  <div
    className={`font-semibold text-base sm:text-lg whitespace-nowrap ${
      isIncome ? "text-emerald-400" : "text-rose-400"
    }`}
  >
    {isIncome ? "+" : "-"}₹
    {Number(transaction.amount).toLocaleString("en-IN")}
  </div>
<button
  type="button"
  onClick={() => handleEdit(transaction)}
  className="p-2 rounded-lg text-zinc-500 hover:text-emerald-400 hover:bg-emerald-950/40 transition cursor-pointer"
  title="Edit transaction"
>
  <Pencil className="w-4 h-4" />
</button>
  <button
    type="button"
    onClick={() => handleDelete(transaction._id)}
    className="p-2 rounded-lg text-zinc-500 hover:text-rose-400 hover:bg-rose-950/40 transition cursor-pointer"
    title="Delete transaction"
  >
    <Trash2 className="w-4 h-4" />
  </button>
</div>
                          </div>

              {deleteError === transaction._id && (
                <div className="mt-2 px-4 py-2 rounded-lg bg-rose-950/50 border border-rose-800/50 text-rose-400 text-sm">
                  Failed to delete transaction. Please try again.
                </div>
              )}
            </div>
          );
          })
        )}
      </div>
    </div>
  );
};

export default Transactions;