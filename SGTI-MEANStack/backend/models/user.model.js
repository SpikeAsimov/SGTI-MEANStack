const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');
const { Schema } = mongoose;
const bcrypt = require('bcryptjs');

mongoose.set('useCreateIndex', true);

const usersSchema = new Schema({

    nombre: { type: String, required: [true, 'El nombre es requerido'], min: 5, trim: true},

    email: { type: String, required: [true, 'El correo es requerido'], unique: true, trim: true,},

    telefono: { type: String, required: false, trim: true},

    password: { type: String, required: [true, 'La contraseña es requerida'], trim: true},

    img : { type: String, required: false, default: "assets/dist/img/avatar.png"},        

    roles: { type: String, required: false, default: "USER_ROLE"},

    google: { type: Boolean, required: false, default: false}
},
    {
        timestamps: true // Registra fecha de creacion y actualizacion de datos.
    }
);


//Funcion que encripta la contraseña, gracias al metodo getSalt y hash.
usersSchema.methods.encryptPassword = async (password) => {
    const salt = await bcrypt.genSalt(10);
    const hash = bcrypt.hash(password, salt);
    return hash;
};
//Funcion que compara contraseñas ingresadas desde Regist a Login, gracias al metedo compare.
usersSchema.methods.comparePassword = async function (password) {
    return await bcrypt.compareSync(password, this.password);
};

usersSchema.plugin(uniqueValidator, {message: '{PATH} debe ser unico'});

module.exports = mongoose.model('Users', usersSchema);