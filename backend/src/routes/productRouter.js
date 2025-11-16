import express from "express";
import { getProductDetails, getProducts, postProducts } from "../controller/productController.js";
import { verifyToken } from "../middleware/authMiddleware.js";
import { generateGetURL } from "../controller/s3Controller.js";
import upload from "../middleware/upload.js";

const router = express.Router();

router.get("/", verifyToken, getProducts);
router.get("/:id", verifyToken,getProductDetails)
router.post("/post", verifyToken,upload.single("image"), postProducts);
router.get("/image/:filename", verifyToken, generateGetURL);

export default router;
