import express from "express";
import { getMyHistory, getPredictionById, getPredictions, uploadAndPredict } from "../controllers/predictions.controller.js";
import verifyToken from "../middleware/protectRoute.js";

const router = express.Router();

router.post("/upload", verifyToken, uploadAndPredict);
router.get("/records", verifyToken, getPredictions);
router.get("/records/:id", verifyToken, getPredictionById);
router.get("/history/:id", verifyToken, getMyHistory);

export default router;