const teacherBirthdayService = require("../services/teacherBirthdayService");
const { imageSave, deleteImage } = require("../Utils/ImageSave");
exports.getAll = async (req, res) => {
    try {
        const teacherBirthdays = await teacherBirthdayService.getAll();
        res.json(teacherBirthdays);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};
exports.getAllAdm = async (req, res) => {
    try {
        const teacherBirthdays = await teacherBirthdayService.getAll();
        res.json(teacherBirthdays);
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
        const newTeacherBirthday = await teacherBirthdayService.create(
            req.body
        );
        res.json(newTeacherBirthday);
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
        const updatedTeacherBirthday = await teacherBirthdayService.update(
            req.params.id,
            req.body
        );
        if (!updatedTeacherBirthday) {
            res.status(404).json({ error: "Teacher birthday not found" });
        } else {
            res.json(updatedTeacherBirthday);
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.delete = async (req, res) => {
    try {
        const deletedTeacherBirthday = await teacherBirthdayService.delete(
            req.params.id
        );
        if (!deletedTeacherBirthday) {
            res.status(404).json({ error: "Teacher birthday not found" });
        } else {
            await deleteImage(deletedTeacherBirthday.src);
            res.json({ message: "Teacher birthday deleted successfully" });
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};
