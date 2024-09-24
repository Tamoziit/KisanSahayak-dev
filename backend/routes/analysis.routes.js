import express from "express";
import { uploadAndPredict } from "../controllers/predictions.controller.js";
import verifyToken from "../middleware/protectRoute.js";


const router = express.Router();

router.post("/analysis", uploadAndPredict);

export default router;