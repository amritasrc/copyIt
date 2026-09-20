import { Request, Response } from "express";
import mongoose from "mongoose";
import { nanoid } from "nanoid";
import Snippet from "../models/snippet.js";

async function handleCreateSnippet(req: Request, res: Response) {
    const { title, code, language } = req.body;

    if (!title || !code || !language) {
        return res.status(400).json({
            success: false,
            message: "Title, code and language are required",
        });
    }

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
    const snippetId = req.params.id as string;
    const userId = req.user?.userId;

    if (!mongoose.Types.ObjectId.isValid(snippetId)) {
        return res.status(400).json({
            success: false,
            message: "Invalid snippet ID",
        });
    }

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
    const snippetId = req.params.id as string;
    const userId = req.user?.userId;

    if (!mongoose.Types.ObjectId.isValid(snippetId)) {
        return res.status(400).json({
            success: false,
            message: "Invalid snippet ID",
        });
    }

    const { title, code, language } = req.body;

    if (!title || !code || !language) {
        return res.status(400).json({
            success: false,
            message: "Title, code and language are required",
        });
    }

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
            after: true,
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

async function handleDeleteSnippet(req: Request, res: Response) {
    const snippetId = req.params.id as string;
    const userId = req.user?.userId;

    if (!mongoose.Types.ObjectId.isValid(snippetId)) {
        return res.status(400).json({
            success: false,
            message: "Invalid snippet ID",
        });
    }

    const snippet = await Snippet.findOneAndDelete(
        {
            _id: snippetId,
            user: userId
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
        message: "Snippet deleted successfully"
    });

}

async function toggleFavorite(req: Request, res: Response) {
    try {
        const snippetId = req.params.id as string;

        if (!mongoose.Types.ObjectId.isValid(snippetId)) {
            return res.status(400).json({
                success: false,
                message: "Invalid snippet ID",
            });
        }

        const snippet = await Snippet.findOne({
            _id: snippetId,
            user: req.user?.userId,
        });

        if (!snippet) {
            return res.status(404).json({
                success: false,
                message: "Snippet not found",
            });
        }

        snippet.isFavorite = !snippet.isFavorite;

        await snippet.save();

        res.json({
            success: true,
            message: snippet.isFavorite
                ? "Snippet added to favorites"
                : "Snippet removed from favorites",
            isFavorite: snippet.isFavorite,
        });
    } catch (error) {
        console.error(error);

        res.status(500).json({
            success: false,
            message: "Something went wrong",
        });
    }
}

async function createShareLink(req: Request, res: Response) {
  try {
    const snippetId = req.params.id as string;

    if (!mongoose.Types.ObjectId.isValid(snippetId)) {
      return res.status(400).json({
        success: false,
        message: "Invalid snippet ID",
      });
    }

    const snippet = await Snippet.findOne({
      _id: snippetId,
      user: req.user?.userId,
    });

    if (!snippet) {
      return res.status(404).json({
        success: false,
        message: "Snippet not found",
      });
    }

    if (!snippet.shareId) {
      snippet.shareId = nanoid(10);
      await snippet.save();
    }

    res.json({
      success: true,
      shareId: snippet.shareId,
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      success: false,
      message: "Something went wrong",
    });
  }
}

async function getSharedSnippet(req: Request, res: Response) {
    try {
        const shareId = req.params.shareId as string;

        const snippet = await Snippet.findOne({
            shareId,
        }).select("title code language createdAt");

        if (!snippet) {
            return res.status(404).json({
                success: false,
                message: "Shared snippet not found",
            });
        }

        res.json({
            success: true,
            snippet,
        });
    } catch (error) {
        console.error(error);

        res.status(500).json({
            success: false,
            message: "Something went wrong",
        });
    }
}

export {
    handleCreateSnippet,
    handleGetUserSnippets,
    handleGetSingleSnippet,
    handleUpdateSnippet,
    handleDeleteSnippet,
    toggleFavorite,
    createShareLink,
    getSharedSnippet,
};