import express from "express"
import dotenv from "dotenv"
import connectDB from "./config/db.js"
import authRouter from "./routes/auth.routes.js"
import cookieParser from "cookie-parser"
import cors from "cors"
import transactionRouter from "./routes/transaction.routes.js"
dotenv.config()

let app=express()
let port=process.env.PORT || 4000

app.use(express.json())
app.use(cookieParser())
app.use(cors({
    origin: "https://walletwave-lovat.vercel.app",
    credentials: true
}))

app.use("/",authRouter);
app.use("/transaction", transactionRouter);


const startServer = async () => {
    try {
        app.listen(port, () => {
            console.log(`Server is started at ${port}`);
        });

        await connectDB();

    } catch (error) {
        console.error("Database connection failed:", error.message);
    }
};

startServer();