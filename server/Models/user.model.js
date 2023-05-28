const mongoose = require('mongoose');

const User = mongoose.model('User', {
    clave: { type: String, required: true, unique: true },
    password: { type: String, required: true, minlength: 5 },
    placas :{type: [String],
         validate: {
        validator: function (placas) {
          return placas.length <= 3; // Validación: la lista de placas debe tener un máximo de 3 elementos
        },
        message: 'La lista de placas debe tener un máximo de 3 elementos.'
      }},
    salt: { type: String, required: true },
});

module.exports = User;