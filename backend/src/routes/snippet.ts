import { Router } from "express";
import authMiddleware from "../middlewares/auth.js";
import { handleCreateSnippet, handleGetUserSnippets, handleGetSingleSnippet, handleUpdateSnippet } from "../controllers/snippet.js";

const router = Router();

router.post('/',authMiddleware, handleCreateSnippet);

router.get("/", authMiddleware, handleGetUserSnippets);

router.get("/:id", authMiddleware, handleGetSingleSnippet);

router.patch("/:id", authMiddleware, handleUpdateSnippet);


export default router;