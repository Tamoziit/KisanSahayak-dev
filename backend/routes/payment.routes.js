import express from "express";
import { paymentHandler } from "../controllers/payment.controller.js";

const router = express.Router();

router.post("/pay", paymentHandler);

export default router;