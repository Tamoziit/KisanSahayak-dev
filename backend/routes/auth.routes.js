import express from "express";
import { register, login, logout, deleteAccount } from "../controllers/auth.controller.js";
import verifyToken from "../middleware/protectRoute.js";

const router = express.Router();

router.post("/register", register);
router.post("/login", login);
router.post("/logout/:id", logout);
router.delete("/delete-account", verifyToken, deleteAccount);

export default router;