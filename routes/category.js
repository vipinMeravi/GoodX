const categoryController = require('../controller/category');
module.exports = (router, app) => {
    router.route('/category')
        .post((req, res) => {
            categoryController.addCategory(req, (status, message, data) => {
                res.status(status).json({ message: message, data: data });
            })
        })

    router.route('/categories')
        .get((req, res) => {
            categoryController.getCategories(req, (status, message, data) => {
                res.status(status).json({ message: message, data: data });
            })
        })
        
    router.route('/category/:categoryId')
    .put((req, res) => {
        categoryController.editCategory(req, (status, message, data) => {
            res.status(status).json({ message: message, data: data });
        })
    })
                
    router.route('/category/:categoryId')
    .delete((req, res) => {
        categoryController.deleteCategory(req, (status, message, data) => {
            res.status(status).json({ message: message, data: data });
        })
    })

    router.route('/category/:categoryId/sub_category')
        .post((req, res) => {
            categoryController.addSubCategory(req, (status, message, data) => {
                res.status(status).json({ message: message, data: data });
            })
        })

    router.route('/category/:categoryId/categories')
        .get((req, res) => {
            categoryController.getSubCategories(req, (status, message, data) => {
                res.status(status).json({ message: message, data: data });
            })
        })
        
    router.route('/category/:categoryId/sub-category/:subCategoryId')
    .put((req, res) => {
        categoryController.editSubCategory(req, (status, message, data) => {
            res.status(status).json({ message: message, data: data });
        })
    })
                
    router.route('/category/:categoryId/sub-category/:subCategoryId')
    .delete((req, res) => {
        categoryController.deleteSubCategory(req, (status, message, data) => {
            res.status(status).json({ message: message, data: data });
        })
    })
    }