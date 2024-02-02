const campusNewsService = require("../services/campusNewsService");
const { imageSave, deleteImage } = require("../Utils/ImageSave");
exports.getAll = async (req, res) => {
    try {
        const campusNews = await campusNewsService.getAll();
        res.json(campusNews);
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
        const newNewsItem = await campusNewsService.create(req.body);
        res.json(newNewsItem);
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
        const updatedNewsItem = await campusNewsService.update(
            req.params.id,
            req.body
        );
        if (!updatedNewsItem) {
            res.status(404).json({ error: "News item not found" });
        } else {
            res.json(updatedNewsItem);
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.delete = async (req, res) => {
    try {
        const deletedNewsItem = await campusNewsService.delete(req.params.id);
        if (!deletedNewsItem) {
            res.status(404).json({ error: "News item not found" });
        } else {
            await deleteImage(deletedNewsItem.src);
            res.json({ message: "News item deleted successfully" });
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};
