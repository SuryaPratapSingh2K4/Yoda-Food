    import dotenv from "dotenv";
    dotenv.config();
    import Order from "../model/orderSchema.js";
    import { instance } from "../server.js";

    export async function processPayment(req, res) {
    try {
        const { items, total, user, userEmail } = req.body;
        const newOrder = new Order({
        items,
        user,
        userEmail,
        total,
        payment: {}
        //   status: "pending",
        });
        const options = {
        amount: total * 100,
        currency: "INR",
        };
        const order = await instance.orders.create(options);

        newOrder.payment = {
            razorpayOrderId: order.id,
            amount: order.amount,
            currency: order.currency
        }

        await newOrder.save();

        res.status(200).json({
        success: true,
        order,
        dbOrderId: newOrder._id
        });
    } catch (error) {
        console.error(error.message);
        res.status(500).json({ message: error.message });
    }
    }

    export async function getKey(req, res) {
    res.status(201).json({
        Key: process.env.RAZORPAY_API_KEY,
    });
    }
