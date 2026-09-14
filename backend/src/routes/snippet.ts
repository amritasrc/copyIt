import { Router } from "express";
import authMiddleware from "../middlewares/auth.js";
import { handleCreateSnippet, handleGetUserSnippets, handleGetSingleSnippet } from "../controllers/snippet.js";

const router = Router();

router.post('/',authMiddleware, handleCreateSnippet);

router.get("/", authMiddleware, handleGetUserSnippets);

router.get("/:id", authMiddleware, handleGetSingleSnippet);


export default router;