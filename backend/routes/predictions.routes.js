import express from "express";
import { uploadAndPredict } from "../controllers/predictions.controller.js";
import verifyToken from "../middleware/protectRoute.js";


const router = express.Router();

router.post("/upload", verifyToken, uploadAndPredict);

export default router;