import { handleCreateNewUser, handleUserLogin } from "../controllers/user.js";
import { Router } from "express";

const router = Router();

router.post("/create", handleCreateNewUser);

router.post("/login", handleUserLogin);

export default router;