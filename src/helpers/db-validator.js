import Category from '../category/category.model.js';
import Comment from '../comment/coment.model.js';
import Publication from '../publications/publication.model.js';

export const existingCategory = async (name = '') => {
    const existing = await Category.findOne({ name });

    if (existing) {
        throw new Error(`${name} already exists in the database`);
    }
};

export const commentExistsById = async (id = '') => {
    const exists = await Comment.findById(id);

    if (!exists) {
        throw new Error(`ID ${id} does not exist in the database`);
    }
};

export const publicationExists = async (id = '') => {
    const exists = await Publication.findById(id);

    if (!exists) {
        throw new Error(`ID ${id} does not exist in the database`);
    }
};
