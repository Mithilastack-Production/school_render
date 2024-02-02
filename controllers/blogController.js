const blogService = require("../services/blogService");
const { imageSave, deleteImage } = require("../Utils/ImageSave");
exports.getAll = async (req, res) => {
    try {
        const blogs = await blogService.getAll();
        res.json(blogs);
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
        const blog = await blogService.create(req.body);
        res.json(blog);
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
        const updatedBlog = await blogService.update(req.params.id, req.body);
        if (!updatedBlog) {
            res.status(404).json({ error: "Blog not found" });
        } else {
            res.json(updatedButton);
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.delete = async (req, res) => {
    try {
        const deletedBlog = await blogService.delete(req.params.id);
        if (!deletedBlog) {
            res.status(404).json({ error: "Blog not found" });
        } else {
            await deleteImage(deletedBlog.src);
            res.json({ message: "Blog deleted successfully" });
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};
