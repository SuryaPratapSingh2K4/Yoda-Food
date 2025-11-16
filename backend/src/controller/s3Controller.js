import { GetObjectCommand, PutObjectCommand } from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";
import dotenv from "dotenv";
import s3 from "../config/s3.js";
dotenv.config();

// export async function generateUploadURL(req, res) {
//     try {
//         const { filename, filetype } = req.query;
//         if (!filename)
//         return res.status(400).json({ message: "Filename required" });
//         const command = new PutObjectCommand({
//         Bucket: process.env.BUCKET_NAME,
//         Key: filename,
//         ContentType: filetype || "image/jpeg" || "image/png" || "image/jpg",
//         });
//         const uploadURL = await getSignedUrl(s3, command, { expiresIn: 3600 });
//         const publicURL = `https://${process.env.BUCKET_NAME}.s3.${process.env.BUCKET_REGION}.amazonaws.com/${filename}`;
//         res.status(201).json({ uploadURL, publicURL });
//     } catch (error) {
//         console.error("Error in generating signed URL");
//         res.status(500).json({ message: "Failed to generate upload URL" });
//     }
// }

export async function generateGetURL(req, res) {
    try {
        const { filename } = req.params;
        if (!filename)
        return res.status(400).json({ message: "filename required" });
        const command = new GetObjectCommand({
        Bucket: process.env.BUCKET_NAME,
        Key: filename,
        });
        const fileURL = await getSignedUrl(s3, command, { expiresIn: 7200 });
        res.status(201).json({ fileURL });
    } catch (error) {
        console.error("Error generating get URL:", error);
        res.status(500).json({ message: "Failed to generate get URL" });
    }
}
