const mongoose = require('mongoose');

const User = mongoose.model('User', {
    clave: { type: String, required: true, unique: true },
    password: { type: String, required: true, minlength: 5 },
    placas :[{type: String}],
    salt: { type: String, required: true },
});

module.exports = User;