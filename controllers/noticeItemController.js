const { pdfSave } = require("../Utils/ImageSave");
const noticeItemService = require("../services/noticeItemService");

exports.getAll = async (req, res) => {
    try {
        const noticeItems = await noticeItemService.getAll();
        res.json(noticeItems);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.create = async (req, res) => {
    try {
        const { image } = req.body;
        const imagePath = await pdfSave(image);
        req.body.src = `/storage/${imagePath}`;
        delete req.body.image;
        req.body.publishedDate = Date.now();
        const newNoticeItem = await noticeItemService.create(req.body);
        res.json(newNoticeItem);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.update = async (req, res) => {
    try {
        const { image } = req.body;
        if (image) {
            const imagePath = await pdfSave(image);
            req.body.src = `/storage/${imagePath}`;
            delete req.body.image;
        }
        const updatedNoticeItem = await noticeItemService.update(
            req.params.id,
            req.body
        );
        if (!updatedNoticeItem) {
            res.status(404).json({ error: "Notice item not found" });
        } else {
            res.json(updatedNoticeItem);
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.delete = async (req, res) => {
    try {
        const deletedNoticeItem = await noticeItemService.delete(req.params.id);
        if (!deletedNoticeItem) {
            res.status(404).json({ error: "Notice item not found" });
        } else {
            await deleteImage(deletedNoticeItem.src);
            res.json({ message: "Notice item deleted successfully" });
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};
