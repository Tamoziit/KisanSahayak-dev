import express from "express";
import { createImage, createMetaData, getImageFromBuckets, updateMetadata, updatePrediction } from "../controllers/elevatedUser.controller.js";
import verifyToken from "../middleware/protectRoute.js";
import verifyUser from "../middleware/elevatedUserProtected.js";

const router = express.Router();

router.patch("/update/:id", verifyToken, verifyUser, updatePrediction);
router.post("/metadata", verifyToken, createMetaData);
router.get("/get-images", verifyToken, verifyUser,  getImageFromBuckets);
router.patch("/update-metadata/:id", verifyToken, verifyUser, updateMetadata);
router.post("/create-image", verifyToken, verifyUser, createImage);

export default router;