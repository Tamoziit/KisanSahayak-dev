import { client } from "../redis/client.js";

export const analysis = async (req, res) => {
    try {
        const { rain, soil_N, soil_K, soil_P, soil_pH, temp, hum } = req.body;

        const cacheValue = await client.get("analysis");
        if (cacheValue) {
            return res.status(200).json(JSON.parse(cacheValue));
        }

        const response = await fetch("http://127.0.0.1:8000/analysis", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                rain,
                soil_N,
                soil_K,
                soil_P,
                soil_pH,
                temp,
                hum
            })
        });
        const data = await response.json();

        if (data) {
            await client.set("analysis", JSON.stringify(data));
            await client.expire("analysis", 30 * 60);
            res.status(200).json(data);
        } else {
            res.status(400).json({ error: "Invalid parameters" });
        }
    } catch (err) {
        console.log("Error in Generating Predictions", err.message);
        res.status(500).json({ error: "Internal Server Error" });
    }
}
