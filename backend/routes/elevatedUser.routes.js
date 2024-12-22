import express from "express";
import { createMetaData, getImageFromBuckets, updateMetadata, updatePrediction } from "../controllers/elevatedUser.controller.js";
import verifyToken from "../middleware/protectRoute.js";

const router = express.Router();

router.patch("/update/:id", verifyToken, updatePrediction);
router.post("/metadata", verifyToken, createMetaData);
router.get("/get-images", verifyToken, getImageFromBuckets);
router.patch("/update-metadata/:id", verifyToken, updateMetadata);

export default router;