import Comment from "./coment.model.js";

export const saveComment = async (req, res) => {
    try {
        const { comment, user } = req.body;

        const newComment = new Comment({
            comment,
            user
        });

        await newComment.save();

        res.status(201).json({
            success: true,
            message: "Comment saved successfully",
            comment: newComment
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({
            success: false,
            message: "Error saving comment",
            error
        });
    }
};

export const listUserComments = async (req, res) => {
    try {
        const comments = await Comment.find();

        res.json({
            success: true,
            comments,
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({
            success: false,
            message: "Error retrieving comments",
        });
    }
};

export const deleteComment = async (req, res) => {
    try {
        const { id } = req.params;

        const comment = await Comment.findById(id);

        if (!comment) {
            return res.status(404).json({
                success: false,
                message: "Comment not found",
            });
        }

        await Comment.findByIdAndDelete(id);

        res.status(200).json({
            success: true,
            message: "Comment deleted successfully",
        });

    } catch (error) {
        console.error("Error deleting comment:", error);
        res.status(500).json({
            success: false,
            message: "Error deleting comment",
            error: error.message
        });
    }
};

export const updateComment = async (req, res) => {
    try {
        const { id } = req.params;

        const comment = await Comment.findById(id);

        if (!comment) {
            return res.status(404).json({
                success: false,
                message: "Comment not found",
            });
        }

        const updatedComment = await Comment.findByIdAndUpdate(id, req.body, { new: true });

        res.json({
            success: true,
            message: "Comment updated successfully",
            comment: updatedComment,
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({
            success: false,
            message: "Error updating comment",
        });
    }
};
