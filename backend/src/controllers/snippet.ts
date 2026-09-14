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

async function handleGetUserSnippets(req: Request, res: Response) {
    const userId = req.user?.userId;

    const snippets = await Snippet.find({ user: userId });

    res.json({
        success: true,
        snippets,
    });
}

async function handleGetSingleSnippet(req: Request, res: Response) {
    const snippetId = req.params.id;
    const userId = req.user?.userId;

    const snippet = await Snippet.findOne({
        _id: snippetId,
        user: userId
    });

    if (!snippet) {
        return res.status(404).json({
            success: false,
            message: "Snippet not found",
        });
    }

    res.json({
        success: true,
        snippet,
    });

}

async function handleUpdateSnippet(req: Request, res: Response) {
    const snippetId = req.params.id;
    const userId = req.user?.userId;

    const { title, code, language } = req.body;

    const snippet = await Snippet.findOneAndUpdate(
        {
            _id: snippetId,
            user: userId
        },
        {
            title,
            code,
            language
        },
        {
            new: true,
        }
    );

    if (!snippet) {
        return res.status(404).json({
            success: false,
            message: "Snippet not found",
        });
    }

    res.json({
        success: true,
        message: "Snippet updated successfully",
        snippet,
    });

}

export {
    handleCreateSnippet,
    handleGetUserSnippets,
    handleGetSingleSnippet,
    handleUpdateSnippet,
};