import express from "express";
import { getProducts, postProducts } from "../controller/productController.js";
import { verifyToken } from "../middleware/authMiddleware.js";
import { generateUploadURL } from "../controller/s3Controller.js";

const router = express.Router();

router.get("/", verifyToken, getProducts);
router.get("/signed-url", verifyToken, generateUploadURL);
router.post("/post", verifyToken, postProducts);

export default router;
