import handleCreateNewUser from "../controllers/user.js";
import { Router } from "express";

const router = Router();

router.post('/create', handleCreateNewUser);

export default router