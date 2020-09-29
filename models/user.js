const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const UserSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    date: {
        type: Date,
        default: Date.now
    },
    is_logged: {
        type: Boolean,
        default: false
    },
    access_token: {
        type: String,
        default: ''
    },
    refresh_token: {
        type: String,
        default: ''
    }
});

module.exports = User = mongoose.model('user', UserSchema);