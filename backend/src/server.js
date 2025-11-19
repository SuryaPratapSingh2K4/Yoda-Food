import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import connectDB from "./config/db.js";
dotenv.config();
import authRouter from "./routes/authRouter.js";
import productRouter from "./routes/productRouter.js";
import Razorpay from "razorpay";
import paymentRouter from './routes/paymentRouter.js'

export const instance = new Razorpay({
    key_id: process.env.RAZORPAY_API_KEY,
    key_secret: process.env.RAZORPAY_API_SECRET,
})

const app = express();
app.use(cors());
app.use(express.json());

app.use("/api/auth", authRouter);
app.use("/api/products", productRouter);
app.use("/api/payment", paymentRouter)

// app.post("/api/payment/process",processPayment)

connectDB().then(() => {
    app.listen(process.env.PORT, () => {
        console.log(`Server connected to PORTNO : ${process.env.PORT}`);
    });
});
