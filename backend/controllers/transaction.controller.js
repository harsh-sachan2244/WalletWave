import Transaction from "../models/transaction.model.js";

export const addTransaction = async (req, res) => {
  try {
    const { title, amount, type, category, date } = req.body;

    // Title validation
if (typeof title !== "string" || !title.trim()) {
  return res.status(400).json({
    message: "Title is required",
  });
}

if (title.trim().length > 100) {
  return res.status(400).json({
    message: "Title cannot exceed 100 characters",
  });
}
// Amount validation
if (
  amount === undefined ||
  amount === null ||
  typeof amount !== "number" ||
  !Number.isFinite(amount) ||
  amount <= 0
) {
  return res.status(400).json({
    message: "Amount must be a number greater than 0",
  });
}
// Type validation
if (!["income", "expense"].includes(type)) {
  return res.status(400).json({
    message: "Type must be income or expense",
  });
}
// Category validation
if (typeof category !== "string" || !category.trim()) {
  return res.status(400).json({
    message: "Category is required",
  });
}

if (category.trim().length > 50) {
  return res.status(400).json({
    message: "Category cannot exceed 50 characters",
  });
}
// Date validation
if (date && isNaN(new Date(date).getTime())) {
  return res.status(400).json({
    message: "Please provide a valid date",
  });
}

    const transaction = await Transaction.create({
  userId: req.userId,
  title: title.trim(),
  amount,
  type,
  category: category.trim(),
  date: date || undefined,
});
     return res.status(201).json({
      message: "Transaction added successfully",
      transaction,
    });
  } catch (error) {
    return res.status(500).json({
      message: error.message,
    });
  }
};

export const getTransactions = async (req, res) => {
  try {
    const transactions = await Transaction.find({
      userId: req.userId,
    }).sort({ date: -1, createdAt:-1 });

    return res.status(200).json({
      transactions,
    });
  } catch (error) {
    return res.status(500).json({
      message: error.message,
    });
  }
};

export const getSummary = async (req, res) => {
  try {
    const transactions = await Transaction.find({
      userId: req.userId,
    });

    let totalIncome = 0;
    let totalExpenses = 0;

    transactions.forEach((transaction) => {
      if (transaction.type === "income") {
        totalIncome += transaction.amount;
      } else if (transaction.type === "expense") {
        totalExpenses += transaction.amount;
      }
    });

    const balance = totalIncome - totalExpenses;

    return res.status(200).json({
      totalIncome,
      totalExpenses,
      balance,
    });
  } catch (error) {
    return res.status(500).json({
      message: error.message,
    });
  }
};

export const deleteTransaction = async (req, res) => {
  try {
    const transaction = await Transaction.findOne({
      _id: req.params.id,
      userId: req.userId,
    });

    if (!transaction) {
      return res.status(404).json({
        message: "Transaction not found",
      });
    }

    await Transaction.findByIdAndDelete(req.params.id);

    return res.status(200).json({
      message: "Transaction deleted successfully",
    });
  } catch (error) {
    return res.status(500).json({
      message: error.message,
    });
  }
};

export const updateTransaction = async (req, res) => {
  try {
    const { id } = req.params;
    const { title, amount, type, category, date } = req.body;

    // Check required fields
    if (!title || !amount || !type || !category) {
      return res.status(400).json({
        message: "All fields are required",
      });
    }

    // Find transaction belonging to logged-in user
    const transaction = await Transaction.findOne({
      _id: id,
      userId: req.userId,
    });

    if (!transaction) {
      return res.status(404).json({
        message: "Transaction not found",
      });
    }

    // Update transaction
    transaction.title = title.trim();
    transaction.amount = amount;
    transaction.type = type;
    transaction.category = category.trim();

    if (date) {
      transaction.date = date;
    }

    await transaction.save();

    return res.status(200).json({
      message: "Transaction updated successfully",
      transaction,
    });
  } catch (error) {
    return res.status(500).json({
      message: error.message,
    });
  }
};