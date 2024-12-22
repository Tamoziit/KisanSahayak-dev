import Image from "../models/image.model.js";

export const getImages = async (req, res) => {
    try {
        const images = await Image.find({});

        if (images) {
            res.status(200).json({
                length: images.length,
                images: images.reverse(),
            });
        } else {
            res.status(400).json({ error: "Couldn't fetch images" });
        }
    } catch (error) {
        console.log("error in get images admin controller", error);
        res.status(500).json({ error: "Internal Server error" });
    }
}