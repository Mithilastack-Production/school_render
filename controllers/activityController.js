const activityService = require("../services/activityService");
const { imageSave, deleteImage } = require("../Utils/ImageSave");
exports.getAll = async (req, res) => {
    try {
        const activities = await activityService.getAll();
        res.json(activities);
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
        const newActivity = await activityService.create(req.body);
        res.json(newActivity);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.update = async (req, res) => {
    try {
        let { image, } = req.body;

        if (image) {
            const imagePath = await imageSave(image);
            req.body.src = `/storage/${imagePath}`;
            delete req.body.image;
        }
        const updatedActivity = await activityService.update(
            req.params.id,
            req.body
        );
        if (!updatedActivity) {
            res.status(404).json({ error: "Activity not found" });
        } else {
            res.json(updatedActivity);
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.delete = async (req, res) => {
    try {
        const deletedActivity = await activityService.delete(req.params.id);
        if (!deletedActivity) {
            res.status(404).json({ error: "Activity not found" });
        } else {
            await deleteImage(deletedActivity.src);
            res.json({ message: "Activity deleted successfully" });
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};
 