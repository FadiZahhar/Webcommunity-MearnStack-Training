const mongoose = require('mongoose');

const UserSchema = mongoose.Schema ({
    name: {
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
        require: true
    },
    date: {
        type: Date,
        default: Date.nowss
    }
});

module.exports = mongoose.model('user', UserSchema);