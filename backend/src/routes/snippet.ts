import { Router } from "express";
import authMiddleware from "../middlewares/auth.js";
import { handleCreateSnippet } from "../controllers/snippet.js";

const router = Router();

router.post('/',authMiddleware, handleCreateSnippet);


export default router;