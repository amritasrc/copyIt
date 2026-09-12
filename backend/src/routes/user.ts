import authMiddleware from "../middlewares/auth.js";
import { handleCreateNewUser, handleUserLogin } from "../controllers/user.js";
import { Router } from "express";

const router = Router();

router.post("/create", handleCreateNewUser);

router.post("/login", handleUserLogin);

router.get("/profile", authMiddleware, (req, res) => {
  res.json({
    message: "Profile fetched successfully",
    user: req.user,
  });
});

export default router;