import express from 'express'
import { processPayment } from '../controller/paymentController.js';

const router = express.Router();

router.post("/process",processPayment)

export default router;