import { Request, Response } from "express";
import Snippet from "../models/snippet.js";

async function handleCreateSnippet(req: Request, res: Response) {
    const { title, code, language } = req.body;
    const userId = req.user?.userId;

    const snippet = await Snippet.create({
        title,
        code,
        language,
        user: userId,
    });

    res.status(201).json({
        success: true,
        message: "Snippet created successfully",
        snippet,
    });
}

export { handleCreateSnippet };