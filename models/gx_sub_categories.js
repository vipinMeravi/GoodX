const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const Role = require('../config/constant').Role
const SubCategorySchema = Schema({
    name: {
        type: String
    },
    image: {
        type: {
            label: String,
            url: String
        }
    },
    categoryId: {
        type: Schema.Types.ObjectId,
        ref: 'Category'
    }
})


const SubCategory = module.exports = mongoose.model('SubCategory', SubCategorySchema);