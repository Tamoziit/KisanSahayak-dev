import express from "express";
import bodyParser from "body-parser";
import cookieParser from "cookie-parser";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import helmet from "helmet";
import morgan from "morgan";
import path from "path";
import createOrder from "./services/paypal.js"
import { fileURLToPath } from "url";
import { client } from "./redis/client.js";

import authRoutes from "./routes/auth.routes.js";
import predictionRoutes from "./routes/predictions.routes.js";
import marketplaceRoutes from "./routes/marketplace.routes.js";
import elevatedUserRoutes from "./routes/elevatedUser.routes.js";

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
    ],
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

const prices = [];
app.post("/", async (req, res) => {
    try {
        const price = req.body;
        console.log(price);
        
        prices.push(price);
        console.log(prices);

    } catch (err) {
        res.status(500).json({ error: err.message });
    }
})

app.post("/pay", async (req, res) => {
    try {
        const price = req.body;
        prices.push(price);
        const url = await createOrder();
        res.redirect(url);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
})

export default prices;

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
    });
}).catch((error) => console.log(`${error} did not connect`));