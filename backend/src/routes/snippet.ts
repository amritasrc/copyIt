import { Router } from "express";
import authMiddleware from "../middlewares/auth.js";
import { handleCreateSnippet, handleGetUserSnippets, handleGetSingleSnippet, handleUpdateSnippet, handleDeleteSnippet, toggleFavorite, createShareLink } from "../controllers/snippet.js";

const router = Router();

router.post('/',authMiddleware, handleCreateSnippet);

router.get("/", authMiddleware, handleGetUserSnippets);

router.get("/:id", authMiddleware, handleGetSingleSnippet);

router.patch("/:id", authMiddleware, handleUpdateSnippet);

router.delete("/:id", authMiddleware, handleDeleteSnippet);

router.patch("/:id/favorite", authMiddleware, toggleFavorite);

router.post("/:id/share", authMiddleware, createShareLink);


export default router;