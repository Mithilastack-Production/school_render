const { imageSave, deleteImage } = require("../Utils/ImageSave");
const aboutService = require("../services/aboutService");

exports.getAll = async (req, res) => {
    try {
        const abouts = await aboutService.getAll();
        res.json(abouts);
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
        const newAbout = await aboutService.create(req.body);
        res.json(newAbout);
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
        const updatedAbout = await aboutService.update(req.params.id, req.body);
        if (!updatedAbout) {
            res.status(404).json({ error: "About not found" });
        } else {
            res.json(updatedAbout);
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.delete = async (req, res) => {
    try {
        const deletedAbout = await aboutService.delete(req.params.id);
        if (!deletedAbout) {
            res.status(404).json({ error: "About not found" });
        } else {
            await deleteImage(deletedAbout.src);
            res.json({ message: "About deleted successfully" });
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};
