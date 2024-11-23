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