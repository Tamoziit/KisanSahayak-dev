import express from "express";
import { createMetaData, updateThread } from "../controllers/elevatedUser.controller.js";
import verifyToken from "../middleware/protectRoute.js";

const router = express.Router();

router.patch("/update/:id", verifyToken, updateThread);
router.post("/metadata", verifyToken, createMetaData);

export default router;