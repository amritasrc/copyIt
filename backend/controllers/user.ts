import { Request, Response } from "express";
import User from "../models/user.js";
import bcrypt from 'bcrypt';

async function handleCreateNewUser(req:Request, res:Response) {
    const { username, email, password } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);

    await User.create({
        username: username,
        email: email,
        password: hashedPassword,
    })

    res.status(201).json({
        success: true,
        message: "User created successfully"
    });
}

export default handleCreateNewUser;