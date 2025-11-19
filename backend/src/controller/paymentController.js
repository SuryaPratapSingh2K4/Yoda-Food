import Razorpay from "razorpay";
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
    //   status: "pending",
    });
    const options = {
      amount: total * 100,
      currency: "INR",
    };
    const order = await instance.orders.create(options);
    // newOrder.payment = {
    //   RazorpayOrderId: order.id,
    //   amount: order.amount,
    // };
    // await newOrder.save();
    res.status(200).json({
      success: true,
      order,
    });
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ message: error.message });
  }
}
