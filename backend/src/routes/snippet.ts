import { Router } from "express";
import authMiddleware from "../middlewares/auth.js";
import { handleCreateSnippet, handleGetUserSnippets, handleGetSingleSnippet, handleUpdateSnippet, handleDeleteSnippet } from "../controllers/snippet.js";

const router = Router();

router.post('/',authMiddleware, handleCreateSnippet);

router.get("/", authMiddleware, handleGetUserSnippets);

router.get("/:id", authMiddleware, handleGetSingleSnippet);

router.patch("/:id", authMiddleware, handleUpdateSnippet);

router.delete("/:id", authMiddleware, handleDeleteSnippet);


export default router;