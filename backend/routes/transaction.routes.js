import express from "express";
import { addTransaction, getTransactions, getSummary, deleteTransaction, updateTransaction} from "../controllers/transaction.controller.js";
import isAuth from "../middleware/auth.middleware.js";

const transactionRouter = express.Router();

transactionRouter.post("/add", isAuth, addTransaction);
transactionRouter.get("/all", isAuth, getTransactions);
transactionRouter.get("/summary", isAuth, getSummary);
transactionRouter.delete("/delete/:id", isAuth, deleteTransaction);
transactionRouter.put("/update/:id", isAuth, updateTransaction);

export default transactionRouter;