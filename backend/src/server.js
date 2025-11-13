import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import connectDB from "./config/db.js";
dotenv.config();
import authRouter from "./routes/authRouter.js";
import productRouter from "./routes/productRouter.js";

const app = express();
app.use(cors());
app.use(express.json());

app.use("/api/auth", authRouter);
app.use("/api/products", productRouter);

connectDB().then(() => {
    app.listen(process.env.PORT, () => {
        console.log(`Server connected to PORTNO : ${process.env.PORT}`);
    });
});
