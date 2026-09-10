import { Request, Response } from "express";
import User from "../models/user.js";

async function handleCreateNewUser(req:Request, res:Response) {
    const { username, email, password } = req.body;

    await User.create({
        username: username,
        email: email,
        password: password
    })

    res.status(201).json({
        success: true,
        message: "User created successfully"
    });
}

export default handleCreateNewUser;