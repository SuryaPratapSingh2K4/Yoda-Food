import express from 'express'
import { MyOrders, processPayment } from '../controller/paymentController.js';
import { verifyToken } from '../middleware/authMiddleware.js';

const router = express.Router();

router.post("/process",processPayment)

router.get("/myorders/:id",verifyToken,MyOrders)

export default router;