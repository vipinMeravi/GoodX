const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const RefreshTokenSchema = Schema({
    token: {
        type: String,
        required: true
    },
    expiry: {
        type: String,
        required: true
    },
    userId: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    }
});


const RefreshToken = module.exports = mongoose.model('refresh_token', RefreshTokenSchema);