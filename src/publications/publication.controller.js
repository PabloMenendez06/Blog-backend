import Publication from "./publication.model.js";
import Category from "../category/category.model.js";
import Comment from "../comment/coment.model.js";

export const savePublication = async (req, res) => {
    try {
        const { title, text, categoryName, user } = req.body;

        const category = await Category.findOne({ name: categoryName });

        if (!category) {
            return res.status(404).json({
                success: false,
                message: "The specified category does not exist",
            });
        }

        const publication = new Publication({
            title,
            text,
            user,
            category: category._id,
        });

        await publication.save();

        res.status(201).json({
            success: true,
            message: "Publication created successfully",
            publication,
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({
            success: false,
            message: "Error creating the publication",
            error,
        });
    }
};

export const listPublications = async (req, res) => {
    try {
        const publications = await Publication.find({ status: true })
            .populate("category", "name")
            .populate({ path: "comments", select: "comment user createdAt" });

        res.json({
            success: true,
            publications,
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Error retrieving publications",
            error,
        });
    }
};

export const listPublicationsByCategory = async (req, res) => {
    try {
        const { categoryName } = req.params;

        const category = await Category.findOne({ name: categoryName });

        if (!category) {
            return res.status(404).json({
                success: false,
                message: "The specified category does not exist",
            });
        }

        const publications = await Publication.find({ category: category._id, status: true })
            .populate("category", "name")
            .populate({ path: "comments", select: "comment user createdAt" });

        res.json({
            success: true,
            publications,
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Error retrieving publications by category",
            error,
        });
    }
};

export const updatePublication = async (req, res) => {
    try {
        const { id } = req.params;
        const { title, text, categoryName } = req.body;

        if (!title && !text && !categoryName) {
            return res.status(400).json({
                success: false,
                message: "You must provide at least one field to update",
            });
        }

        const publication = await Publication.findById(id);

        if (!publication) {
            return res.status(404).json({
                success: false,
                message: "Publication not found",
            });
        }

        if (categoryName) {
            const category = await Category.findOne({ name: categoryName });
            if (!category) {
                return res.status(404).json({
                    success: false,
                    message: "The specified category does not exist",
                });
            }
            publication.category = category._id;
        }

        if (title) publication.title = title;
        if (text) publication.text = text;

        await publication.save();

        res.json({
            success: true,
            message: "Publication updated successfully",
            publication,
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({
            success: false,
            message: "Error updating the publication",
            error,
        });
    }
};

export const deletePublication = async (req, res) => {
    try {
        const { id } = req.params;

        const deletedPublication = await Publication.findByIdAndDelete(id);

        if (!deletedPublication) {
            return res.status(404).json({
                success: false,
                message: "Publication not found",
            });
        }

        res.status(200).json({
            success: true,
            message: "Publication deleted successfully",
            publicationId: id,
        });
    } catch (error) {
        console.error("Error deleting publication:", error);
        res.status(500).json({
            success: false,
            message: "Error deleting the publication",
            error: error.message,
        });
    }
};

export const addCommentToPublication = async (req, res) => {
    try {
        const { id } = req.params;
        let { comment, user } = req.body;

        const publication = await Publication.findById(id);
        if (!publication) {
            return res.status(404).json({
                success: false,
                message: "Publication not found"
            });
        }

        if (!user || user.trim() === "") {
            const anonymousCount = await Comment.countDocuments({ user: { $regex: /^Anonymous\d*$/ } });
            user = `Anonymous${anonymousCount + 1}`;
        }

        const existingComment = await Comment.findOne({
            _id: { $in: publication.comments },
            user: user
        });

        if (existingComment) {
            return res.status(400).json({
                success: false,
                message: "This user has already commented on this publication"
            });
        }

        const newComment = new Comment({ comment, user });
        await newComment.save();

        publication.comments.push(newComment._id);
        await publication.save();

        res.status(201).json({
            success: true,
            message: "Comment added successfully",
            comment: newComment
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({
            success: false,
            message: "Error adding the comment",
            error
        });
    }
};
