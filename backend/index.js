import "./sentry/instrument.js";
import express from "express";
import bodyParser from "body-parser";
import cookieParser from "cookie-parser";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import helmet from "helmet";
import morgan from "morgan";
import path from "path";
import * as Sentry from "@sentry/node";
import { fileURLToPath } from "url";
import { client } from "./redis/client.js";

import authRoutes from "./routes/auth.routes.js";
import predictionRoutes from "./routes/predictions.routes.js";
import marketplaceRoutes from "./routes/marketplace.routes.js";
import elevatedUserRoutes from "./routes/elevatedUser.routes.js";
import analysisRoutes from "./routes/analysis.routes.js";
import paymentRoutes from "./routes/payment.routes.js";
import stripe from "./stripe/stripeInit.js";
import adminRoutes from "./routes/admin.routes.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
dotenv.config();

const app = express();

const corOpts = {
    origin: '*',
    methods: [
        'GET',
        'POST',
        'PATCH',
        'DELETE'
    ],
    allowedHeaders: [
        'Content-Type',
        'Authorization',
        'baggage',
        'sentry-trace'
    ],
    credentials: true
};

app.use(express.json());
app.use(helmet());
app.use(helmet.crossOriginResourcePolicy({ policy: "cross-origin" }));
app.use(morgan("common"));
app.use(bodyParser.json({ limit: '1000mb', extended: true }))
app.use(bodyParser.urlencoded({ limit: '1000mb', extended: true }))
app.use(cors(corOpts));
app.use(cookieParser());
//app.use("/assets", express.static(path.join(__dirname, "public/assets")));

app.use("/auth", authRoutes);
app.use("/predictions", predictionRoutes);
app.use("/marketplace", marketplaceRoutes);
app.use("/elevatedUser", elevatedUserRoutes);
app.use("/dashboard", analysisRoutes);
app.use("/payment", paymentRoutes);
app.use("/admin", adminRoutes);

// Sentry setup
app.get("/debug-sentry", function mainHandler(req, res) {
    throw new Error("My first Sentry error!");
});

Sentry.setupExpressErrorHandler(app);

const PORT = process.env.PORT || 6001;
mongoose.connect(process.env.MONGO_URL).then(() => {
    app.listen(PORT, () => {
        console.log(`Server PORT: ${PORT}`);
        console.log("Connected to MongoDB");

        if (client) {
            console.log("Connected to Redis");
        } else {
            console.log("Error in connecting to Redis");
        }

        if (stripe) {
            console.log("Stripe Initialized");
        } else {
            console.log("Error in connecting to Stripe");
        }
    });
}).catch((error) => console.log(`${error} did not connect`));