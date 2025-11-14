import Product from "../model/productSchema.js";
import dotenv from 'dotenv';
dotenv.config();
import s3 from "../config/s3.js";
import { PutObjectCommand } from "@aws-sdk/client-s3";

export async function getProducts(req, res) {
    const product = await Product.find();
    res.status(201).json(product);
}

export async function postProducts(req, res) {
    try {
        const { title, category, description, price, stocks } = req.body;
        let imageUrl = null;
        if(req.file){
            const file = req.file;
            const fileName = `${Date.now()}_${file.originalname}`;
            const params = {
                Bucket: process.env.BUCKET_NAME,
                Key: fileName,
                Body: file.buffer,
                ContentType: file.mimetype
            }
            await s3.send(new PutObjectCommand(params));
            imageUrl = `https://${process.env.BUCKET_NAME}.s3.${process.env.BUCKET_REGION}.amazonaws.com/${fileName}`;
        }
        const newProduct = await Product.create({
        title,
        category,
        description,
        price,
        imageUrl,
        stocks,
        });
        res.status(201).json( {newProduct} );
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}
