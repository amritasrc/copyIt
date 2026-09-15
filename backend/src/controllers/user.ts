import { Request, Response } from "express";
import User from "../models/user.js";
import bcrypt from 'bcrypt';
import jwt from "jsonwebtoken";

async function handleCreateNewUser(req: Request, res: Response) {
    const { username, email, password } = req.body;

    if (!username || !email || !password) {
        return res.status(400).json({
            success: false,
            message: "Username, email and password are required",
        });
    }

    if (!email.includes("@")) {
        return res.status(400).json({
            success: false,
            message: "Please provide a valid email",
        });
    }

    if (password.length < 6) {
        return res.status(400).json({
            success: false,
            message: "Password must be at least 6 characters"
        });
    }

    const existingUser = await User.findOne({
        $or: [
            { username },
            { email }
        ]
    });

    if (existingUser) {
        return res.status(409).json({
            success: false,
            message: "Username or email already exists"
        });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    await User.create({
        username,
        email,
        password: hashedPassword,
    })

    res.status(201).json({
        success: true,
        message: "User created successfully"
    });
}

async function handleUserLogin(req: Request, res: Response) {
    const { email, password } = req.body;

    if (!email || !password) {
        return res.status(400).json({
            success: false,
            message: "Email and password are required",
        });
    }

    const user = await User.findOne({ email });

    if (user) {
        const isPasswordCorrect = await bcrypt.compare(
            password,
            user.password
        );

        if (isPasswordCorrect) {
            const token = jwt.sign(
                {
                    userId: user._id,
                    email: user.email,
                },
                process.env.JWT_SECRET!,
                {
                    expiresIn: "1h",
                }
            );

            res.json({
                message: "Login successful",
                token
            });
        } else {
            res.status(401).json({
                message: "Incorrect password"
            });
        }
    } else {
        res.status(404).json({
            message: "User not found"
        });
    }
}

export { handleCreateNewUser, handleUserLogin };