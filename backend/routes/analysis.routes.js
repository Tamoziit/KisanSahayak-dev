import express from "express";
import { analysis } from "../controllers/analysis.controller.js";
import verifyToken from "../middleware/protectRoute.js";

const router = express.Router();

router.post("/analysis", analysis);

export default router;