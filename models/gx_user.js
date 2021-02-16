const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const Role = require('../config/constant').Role
const UserSchema = Schema({
    full_name: {
        type: String
    },
    first_name: {
        type: String
    },
    last_name: {
        type: String
    },
    username: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    mobileNo: {
        type: Number,
        required: true,
    },
    isActive: {
        type: Boolean,
        default: true
    },
    role: {
        type: Number,
        default: Role.User
    }

});


const User = module.exports = mongoose.model('User', UserSchema);