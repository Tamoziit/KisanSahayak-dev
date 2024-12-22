import Metadata from "../models/metadata.model.js";
import Prediction from "../models/predictions.model.js";
import { client } from "../redis/client.js";

export const updateThread = async (req, res) => {
    try {
        const predictions = await Prediction.findByIdAndUpdate(req.params.id, req.body, {
            new: true,
            runValidators: true
        });

        if (predictions) {
            await client.del(`userHistory:${predictions.userId}`)
            res.status(200).json(predictions);
        } else {
            res.staus(400).json({ error: "Couldn't Update the entry" });
        }
    } catch (error) {
        console.log("error in updating prediction", error.message);
        res.status(500).json({ error: "Internal Server error" })
    }
}

export const createMetaData = async (req, res) => {
    try {
        const id = req.user._id;
        const newMetadata = new Metadata({
            user: id
        });

        if (newMetadata) {
            await newMetadata.save();
            res.status(201).json(newMetadata);
        } else {
            res.status(400).json({ error: "Invalid data provided for creating metdata" });
        }
    } catch (error) {
        console.log("error in creating metadata", error.message);
        res.status(500).json({ error: "Internal Server error" });
    }
}