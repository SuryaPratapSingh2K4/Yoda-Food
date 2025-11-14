import express from "express";
import { getProducts, postProducts } from "../controller/productController.js";
import { verifyToken } from "../middleware/authMiddleware.js";
import { generateUploadURL } from "../controller/s3Controller.js";
import upload from "../middleware/upload.js";

const router = express.Router();

router.get("/", verifyToken, getProducts);
router.post("/post", verifyToken,upload.single("image"), postProducts);

export default router;
