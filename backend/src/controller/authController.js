import jwt from "jsonwebtoken";
import User from "../model/authSchema.js";
import bcrypt from "bcrypt";

export const createToken = (user) => {
    return jwt.sign({ id: user._id }, process.env.SECRET, { expiresIn: "7d" });
};

export async function getSignUp(req, res) {
    const { name, email, password } = req.body;
    try {
        const exists = await User.findOne({ email });
        if (exists) return res.status(400).json({ message: "User already exists" });
        const salt = await bcrypt.genSalt(10);
        const passwordHash = await bcrypt.hash(password, salt);
        const newUser = new User({ name, email, password: passwordHash });
        await newUser.save();
        const token = await createToken(newUser);
        return res.status(201).json({token, user: newUser});
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

export async function getLogin(req, res) {
    const { email, password } = req.body;
    try {
        const exists = await User.findOne({ email });
        if (!exists)
        return res.status(400).json({ message: "Invalid credentials" });
        const match = await bcrypt.compare(password, exists.password);
        if (!match) return res.status(400).json({ message: "Invalid Credentials" });
        const token = await createToken(exists);
        return res.status(201).json({exists,token});
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}
