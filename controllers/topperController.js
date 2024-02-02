const topperService = require("../services/topperService");
const { imageSave } = require("../Utils/ImageSave");

const { v4: uuidv4 } = require("uuid");

exports.getAll = async (req, res) => {
    try {
        const toppers = await topperService.getAll();
        res.json(toppers);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.create = async (req, res) => {
    try {
        let { image, id } = req.body;
        const imagePath = await imageSave(image);
        req.body.toppers.src = `/storage/${imagePath}`;
        delete req.body.image;
        const studentId = uuidv4();
        if (id !== "New Section") {
            const newTopper = await topperService.getById(id);
            newTopper.toppers.push({
                ...req.body,
                studentId,
            });
            newTopper.save();
            res.json(newTopper);
        } else {
            const newTopper = await topperService.create({
                ...req.body,
                studentId,
            });
            res.json(newTopper);
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.update = async (req, res) => {
    try {
        const updatedTopper = await topperService.update(
            req.params.section,
            req.body
        );
        if (!updatedTopper) {
            res.status(404).json({ error: "Topper section not found" });
        } else {
            res.json(updatedTopper);
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.delete = async (req, res) => {
    try {
        const deletedTopper = await topperService.delete(req.params.section);
        if (!deletedTopper) {
            res.status(404).json({ error: "Topper section not found" });
        } else {
            res.json({ message: "Topper section deleted successfully" });
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};
