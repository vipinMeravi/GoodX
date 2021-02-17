require('dotenv').config()
var mongoose = require('mongoose');
const mongoUrl = 'mongodb://localhost/my_database';
var db = mongoose.connect(mongoUrl, {
    useNewUrlParser: true,
    useUnifiedTopology: true
});
mongoose.connection.once('open', () => {
    console.log('conneted to database');
});

mongoose.connection.once('error', (error) => {
    console.log(error);
});

console.log(mongoose.connection.readyState);
var onerror = function (error, callback) {
    mongoose.connection.close();
    callback(error);
};

const user = require('../models/gx_user');
const category = require('../models/gx_category');
const sub_category = require('../models/gx_sub_category');
const access_token = require('../models/gx_access_token');
const refresh_token = require('../models/gx_refresh_token');

mongoose.Promise = global.Promise;
module.exports.db = db;
module.exports = {
    user,
    access_token,
    refresh_token,
    category,
    sub_category
}