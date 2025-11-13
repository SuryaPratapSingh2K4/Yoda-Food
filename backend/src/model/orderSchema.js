import mongoose, { mongo } from "mongoose";

const orderSchema = mongoose.Schema(
    {
        user: { type: mongoose.Schema.Types.ObjectId, ref: "User", default: null },
        userEmail: { type: String, default: null },
        total: { type: Number, required: true },
        items: [
        {
            productId: { type: mongoose.Schema.Types.ObjectId, ref: "Product" },
            title: String,
            price: Number,
            qty: Number,
        },
        ],
        status: {
        type: String,
        enum: ["pending", "delivered", "paid"],
        default: "pending",
        },
        payment: Object,
    },
    {
        timestamps: true,
    }
);

export default mongoose.model("Order", orderSchema);
