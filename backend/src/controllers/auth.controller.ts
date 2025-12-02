import express from "express";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import * as z from "zod";
import { User } from "../models/user.model.js";

const JWT_SECRET_KEY = process.env.JWT_SECRET_KEY;
if (!JWT_SECRET_KEY) {
    throw new Error("JWT_SECRET_KEY missing in environment variables.");
}

// Register
export const register = async (req: express.Request, res: express.Response) => {

    const registerSchema = z.object({
        name: z.string().min(3, "Name must be at least 3 characters long"),
        email: z.string().email("Invalid email"),
        password: z.string().min(6, "Password must be at least 6 characters long")
    });


    try {
        const parsed = registerSchema.safeParse(req.body);
        if (!parsed.success) {
            return res.status(400).json({ error: parsed.error });
        }

        const { name, email, password } = parsed.data;

        const hashedPassword = await bcrypt.hash(password, 10);

        const user = await User.create({ name, email, password: hashedPassword });

        const token = jwt.sign({ id: user._id }, JWT_SECRET_KEY);

        return res.status(200).json({ token });
    }
    catch (error) {
        console.error("Error registering user:", error);
        return res.status(500).json({ error: "Internal server error" });
    }
};

// Login
export const login = async (req: express.Request, res: express.Response) => {

    const loginSchema = z.object({
        email: z.string().email("Invalid email"),
        password: z.string().min(6, "Password must be at least 6 characters long")
    });

    try {
        const parsed = loginSchema.safeParse(req.body);
        if (!parsed.success) {
            return res.status(400).json({ error: parsed.error });
        }

        const { email, password } = parsed.data;

        const user = await User.findOne({ email });
        if (!user) return res.status(401).json({ error: "Invalid email or password" });

        const valid = await bcrypt.compare(password, user.password);
        if (!valid) return res.status(401).json({ error: "Invalid email or password" });

        const token = jwt.sign({ id: user._id }, JWT_SECRET_KEY);

        return res.status(200).json({ token });
    }
    catch (error) {
        console.error("Error logging in:", error);
        return res.status(500).json({ error: "Internal server error" });
    }
};

// Me
export const me = async (req: express.Request, res: express.Response) => {
    const userId = req.user?.id;

    if (!userId) {
        return res.status(403).json({ message: "User not logged in" });
    }

    const user = await User.findById(userId);

    if (!user) {
        return res.status(403).json({ message: "User not logged in" });
    }

    return res.json({ name: user.name });
};
