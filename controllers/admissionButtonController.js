const admissionButtonService = require("../services/admissionButtonService");
const { imageSave, deleteImage } = require("../Utils/ImageSave");
exports.getAll = async (req, res) => {
    try {
        const buttons = await admissionButtonService.getAll();
        res.json(buttons);
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
        const newButton = await admissionButtonService.create(req.body);
        res.json(newButton);
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
        const updatedButton = await admissionButtonService.update(
            req.params.id,
            req.body
        );
        if (!updatedButton) {
            res.status(404).json({ error: "Admission button not found" });
        } else {
            res.json(updatedButton);
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.delete = async (req, res) => {
    try {
        const deletedButton = await admissionButtonService.delete(
            req.params.id
        );
        if (!deletedButton) {
            res.status(404).json({ error: "Admission button not found" });
        } else {
            await deleteImage(deletedButton.src);
            res.json({ message: "Admission button deleted successfully" });
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};
