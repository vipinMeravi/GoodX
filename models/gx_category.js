const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const Role = require('../config/constant').Role
const CategorySchema = Schema({
    name: {
        type: String
    },
    image: {
        type: {
            label: String,
            url: String
        }
    },
    type: {
        type: String
    }
})


const Category = module.exports = mongoose.model('Category', CategorySchema);