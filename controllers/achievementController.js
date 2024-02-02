const achievementService = require("../services/achievementService");
const { imageSave, deleteImage } = require("../Utils/ImageSave");
exports.getAll = async (req, res) => {
    try {
        const achievements = await achievementService.getAll();
        res.json(achievements);
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
        const newAchievement = await achievementService.create(req.body);
        res.json(newAchievement);
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
        const updatedAchievement = await achievementService.update(
            req.params.id,
            req.body
        );
        if (!updatedAchievement) {
            res.status(404).json({ error: "Achievement not found" });
        } else {
            res.json(updatedAchievement);
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.delete = async (req, res) => {
    try {
        const deletedAchievement = await achievementService.delete(
            req.params.id
        );
        if (!deletedAchievement) {
            res.status(404).json({ error: "Achievement not found" });
        } else {
            await deleteImage(deletedAchievement.src);
            res.json({ message: "Achievement deleted successfully" });
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};
