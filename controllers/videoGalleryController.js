const videoGalleryService = require("../services/videoGalleryService");

exports.getAll = async (req, res) => {
    try {
        const videoGallerys = await videoGalleryService.getAll();
        res.json(videoGallerys);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.create = async (req, res) => {
    try {
        const newVideoGallery = await videoGalleryService.create(req.body);
        res.json(newVideoGallery);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.update = async (req, res) => {
    try {
        const updatedVideoGallery = await videoGalleryService.update(
            req.params.id,
            req.body
        );
        if (!updatedVideoGallery) {
            res.status(404).json({ error: "VideoGallery not found" });
        } else {
            res.json(updatedVideoGallery);
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.delete = async (req, res) => {
    try {
        const deletedVideoGallery = await videoGalleryService.delete(
            req.params.id
        );
        if (!deletedVideoGallery) {
            res.status(404).json({ error: "VideoGallery not found" });
        } else {
            res.json({ message: "VideoGallery deleted successfully" });
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};
