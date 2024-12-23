import express from "express";
import { deleteImage, getImages } from "../controllers/admin.controller.js";

const router = express.Router();

router.get("/images", getImages);
router.delete("/delete-image/:id", deleteImage);

export default router;