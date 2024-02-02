const messageService = require("../services/messageService");
const { imageSave, deleteImage } = require("../Utils/ImageSave");
exports.getAll = async (req, res) => {
    try {
        const messages = await messageService.getAll();
        res.json(messages);
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
        const newMessage = await messageService.create(req.body);
        res.json(newMessage);
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
        const updatedMessage = await messageService.update(
            req.params.id,
            req.body
        );
        if (!updatedMessage) {
            res.status(404).json({ error: "Message not found" });
        } else {
            res.json(updatedMessage);
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.delete = async (req, res) => {
    try {
        const deletedMessage = await messageService.delete(req.params.id);
        if (!deletedMessage) {
            res.status(404).json({ error: "Message not found" });
        } else {
            await deleteImage(deletedMessage.src);
            res.json({ message: "Message deleted successfully" });
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};
