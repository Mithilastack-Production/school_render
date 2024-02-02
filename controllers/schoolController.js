const schoolService = require("../services/schoolService");
const {imageSave} = require("../Utils/ImageSave")

exports.getAll = async (req, res) => {
    try {
        const schools = await schoolService.getAll();
        res.json(schools);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};


exports.create = async (req, res) => {
    try {
        let { image1, image2 } = req.body;
        const imagePath1 = await imageSave(image1);
        req.body.logo.src = `/storage/${imagePath1}`;
        delete req.body.image1;
        const imagePath2 = await imageSave(image2);
        req.body.certification.src = `/storage/${imagePath2}`;
        delete req.body.image2;
        const newSchool = await schoolService.create(req.body);
        res.json(newSchool);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.update = async (req, res) => {
    try {
        let { image1, image2 } = req.body;
        if (image1) {
            const imagePath1 = await imageSave(image1);
            req.body.logo.src = `/storage/${imagePath1}`;
            delete req.body.image1;
        }
        if (image2) {
            const imagePath2 = await imageSave(image2);
            req.body.certification.src = `/storage/${imagePath2}`;
            delete req.body.image2;
        }
        const updatedSchool = await schoolService.update(
            req.params.id,
            req.body
        );
        if (!updatedSchool) {
            res.status(404).json({ error: "School not found" });
        } else {
            res.json(updatedSchool);
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.delete = async (req, res) => {
    try {
        const deletedSchool = await schoolService.delete(req.params.id);
        if (!deletedSchool) {
            res.status(404).json({ error: "School not found" });
        } else {
            res.json({ message: "School deleted successfully" });
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};
