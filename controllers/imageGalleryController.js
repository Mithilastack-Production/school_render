const imageGalleryService = require("../services/imageGalleryService");
const { imageSave, deleteImage } = require("../Utils/ImageSave");

exports.getAll = async (req, res) => {
    try {
        const images = await imageGalleryService.getAll();
        res.json(images);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.create = async (req, res) => {
    try {
        let { image } = req.body;
        const imagePath = await imageSave(image);
        req.body.src = `/storage/${imagePath}`;
        delete req.body.image;
        const newImage = await imageGalleryService.create(req.body);
        res.json(newImage);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.update = async (req, res) => {
    try {
        let { image } = req.body;
        if (image) {
            const imagePath = await imageSave(image);
            req.body.src = `/storage/${imagePath}`;
            delete req.body.image;
        }
        const updatedImage = await imageGalleryService.update(
            req.params.id,
            req.body
        );
        if (!updatedImage) {
            res.status(404).json({ error: "Image not found" });
        } else {
            res.json(updatedImage);
        } 
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.delete = async (req, res) => {
    try {
        const deletedImage = await imageGalleryService.delete(req.params.id);
        if (!deletedImage) {
            res.status(404).json({ error: "Image not found" });
        } else {
            await deleteImage(deletedImage.src);
            res.json({ message: "Image deleted successfully" });
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};
