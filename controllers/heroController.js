const heroService = require("../services/heroService");
const { imageSave, deleteImage } = require("../Utils/ImageSave");
exports.getAll = async (req, res) => {
    try {
        const heros = await heroService.getAll();
        res.json(heros);
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
        const newHero = await heroService.create(req.body);
        res.json(newHero);
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
        const updatedHero = await heroService.update(req.params.id, req.body);
        if (!updatedHero) {
            res.status(404).json({ error: "Hero not found" });
        } else {
            res.json(updatedHero);
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.delete = async (req, res) => {
    try {
        const deletedHero = await heroService.delete(req.params.id);
        if (!deletedHero) {
            res.status(404).json({ error: "Hero not found" });
        } else {
            await deleteImage(deletedHero.src);
            res.json({ message: "Hero deleted successfully" });
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};
