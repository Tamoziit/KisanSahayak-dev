import express from "express";
import { analysis, analysis2 } from "../controllers/analysis.controller.js";
import verifyToken from "../middleware/protectRoute.js";

const router = express.Router();

router.post("/analysis", verifyToken, analysis);
router.get("/personalized/:id", verifyToken, analysis2);

export default router;