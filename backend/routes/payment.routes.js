import express from "express";
import { paymentHandler, priceHandler } from "../controllers/payment.controller.js";

const router = express.Router();

router.post("/price", priceHandler);
router.post("/pay", paymentHandler);

export default router;