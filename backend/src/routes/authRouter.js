import express from 'express'
import { getLogin, getSignUp } from '../controller/authController.js';

const router = express.Router();

router.post("/signup",getSignUp);
router.post("/login",getLogin)

export default router