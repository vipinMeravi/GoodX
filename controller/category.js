const db = require('../config/db')
module.exports = {
    addCategory: async (req, callback) => {
        try {
            if (await db['category'].findOne({ name: req.body.name })) {
                callback(400, `Category with name ${req.body.name} already exists`)
            } else {
                const newCategory = new db['category'](req.body);
                newCategory.save()
                    .then(category => {
                        callback(200, "Category added successfully", category)
                    })
                    .catch(error => {
                        callback(500, error.message, error);
                    })
            }
        } catch (error) {
            console.error(error);
            callback(500, error.message, error);
        }
    },
    getCategories: async (req, callback) => {
        try {
            let categories = await db['category'].find({});
            callback(200, "Categories", categories);
        } catch (error) {
            console.error(error);
            callback(500, error.message, error);
        }
    },
    editCategory: async (req, callback) => {
        try {
            db['category'].findByIdAndUpdate(req.params.categoryId, req.body)
                .then(category => {
                    callback(200, "Category updated sucessfully")
                })
                .catch(error => {
                    callback(500, error.message, error)
                })
        } catch (error) {
            console.error(error);
            callback(500, error.message, error);
        }
    },
    deleteCategory: async (req, callback) => {
        try {
            db['category'].findByIdAndRemove(req.params.categoryId)
                .then(category => {
                    callback(200, "Category deleted")
                })
                .catch(error => {
                    console.error(error);
                    callback(500, error.message, error);
                })
        } catch (error) {
            console.error(error);
            callback(500, error.message, error);
        }
    },
    addSubCategory: async (req, callback) => {
        try {

        } catch (error) {
            console.error(error);
            callback(500, error.message, error);
        }
    },
    getSubCategories: async (req, callback) => {
        try {

        } catch (error) {
            console.error(error);
            callback(500, error.message, error);
        }
    },
    editSubCategory: async (req, callback) => {
        try {

        } catch (error) {
            console.error(error);
            callback(500, error.message, error);
        }
    },
    deleteSubCategory: async (req, callback) => {
        try {

        } catch (error) {
            console.error(error);
            callback(500, error.message, error);
        }
    },
}