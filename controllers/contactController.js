const contactService = require("../services/contactService");
const { imageSave, deleteImage } = require("../Utils/ImageSave");
exports.getAll = async (req, res) => {
    try {
        const contacts = await contactService.getAll();
        res.json(contacts);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.create = async (req, res) => {
    try {
        const newContact = await contactService.create(req.body);
        res.json(newContact);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.update = async (req, res) => {
    try {
        const updatedContact = await contactService.update(
            req.params.id,
            req.body
        );
        if (!updatedContact) {
            res.status(404).json({ error: "Contact Info not found" });
        } else {
            res.json(updatedContact);
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.delete = async (req, res) => {
    try {
        const deletedContact = await contactService.delete(req.params.id);
        if (!deletedContact) {
            res.status(404).json({ error: "Contact Info not found" });
        } else {
            res.json({ message: "Contact Info  deleted successfully" });
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};
