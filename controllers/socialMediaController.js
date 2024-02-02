const { imageSave, deleteImage } = require("../Utils/ImageSave");
const socialMediaService = require("../services/socialMediaService");

// Controller methods
exports.getAll = async (req, res) => {
    try {
        const socialMediaList = await socialMediaService.getAll();
        res.json(socialMediaList);
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
        const newSocialMedia = await socialMediaService.create(req.body);
        res.json(newSocialMedia);
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
        const updatedSocialMedia = await socialMediaService.update(
            req.params.id,
            req.body
        );
        if (!updatedSocialMedia) {
            res.status(404).json({ error: "Social media not found" });
        } else {
            res.json(updatedSocialMedia);
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.delete = async (req, res) => {
    try {
        const deletedSocialMedia = await socialMediaService.delete(
            req.params.id
        );
        if (!deletedSocialMedia) {
            res.status(404).json({ error: "Social media not found" });
        } else {
            await deleteImage(deletedSocialMedia.src);
            res.json({ message: "Social media deleted successfully" });
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};
