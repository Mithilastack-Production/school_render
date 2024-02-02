const studentBirthdayService = require("../services/studentBirthdayService");
const { imageSave, deleteImage } = require("../Utils/ImageSave");
exports.getAll = async (req, res) => {
    try {
        const studentBirthdays = await studentBirthdayService.getAll();
        res.json(studentBirthdays);
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
        const newStudentBirthday = await studentBirthdayService.create(
            req.body
        );
        res.json(newStudentBirthday);
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
        const updatedStudentBirthday = await studentBirthdayService.update(
            req.params.id,
            req.body
        );
        if (!updatedStudentBirthday) {
            res.status(404).json({ error: "Student birthday not found" });
        } else {
            res.json(updatedStudentBirthday);
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.delete = async (req, res) => {
    try {
        const deletedStudentBirthday = await studentBirthdayService.delete(
            req.params.id
        );
        if (!deletedStudentBirthday) {
            res.status(404).json({ error: "Student birthday not found" });
        } else {
            await deleteImage(deletedStudentBirthday.src);
            res.json({ message: "Student birthday deleted successfully" });
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};
