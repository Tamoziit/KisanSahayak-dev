import Image from "../models/image.model.js";

export const getImages = async (req, res) => {
    const limit = 200;
    const page = parseInt(req.query.page) || 1;

    try {
        const totalImages = await Image.countDocuments();
        const images = await Image.find({})
            .sort({ _id: -1 })
            .skip((page - 1) * limit)
            .limit(limit);

        res.status(200).json({
            totalImages,
            currentPage: page,
            totalPages: Math.ceil(totalImages / limit),
            images,
        });
    } catch (error) {
        console.log("Error in getImages admin controller", error);
        res.status(500).json({ error: "Internal Server error" });
    }
};

export const deleteImage = async (req, res) => {
    const { id } = req.params;

    try {
        const deletedImage = await Image.findByIdAndDelete(id);

        if (deletedImage) {
            res.status(200).json({
                message: "Image deleted successfully",
                image: deletedImage,
            });
        } else {
            res.status(404).json({ error: "Image not found" });
        }
    } catch (error) {
        console.log("Error in deleteImageById admin controller", error);
        res.status(500).json({ error: "Internal Server error" });
    }
};