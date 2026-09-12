import { Request, Response } from "express";
import User from "../models/user.js";
import bcrypt from 'bcrypt';
import jwt from "jsonwebtoken";

async function handleCreateNewUser(req: Request, res: Response) {
    const { username, email, password } = req.body;
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
                process.env.JWT_SECRET!
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