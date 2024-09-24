import mongoose from "mongoose";

const PredictionSchema = new mongoose.Schema({
    rain: {
        type: Number,
        required: true,
    },
    soil_N: {
        type: Number,
        required: true,
    },
    soil_K: {
        type: Number,
        required: true,
    },
    soil_P: {
        type: Number,
        required: true,
    },
    soil_pH: {
        type: Number,
        required: true,
    },
    temp: {
        type: Number,
        required: true
    },
    hum: {
        type: Number,
        requited: true
    },
}, { timestamps: true });

const Prediction = mongoose.model("Prediction", PredictionSchema);

export default Prediction;