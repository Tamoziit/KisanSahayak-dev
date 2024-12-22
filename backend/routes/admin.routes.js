import express from "express";
import { getImages } from "../controllers/admin.controller.js";

const router = express.Router();

router.get("/images", getImages);

export default router;