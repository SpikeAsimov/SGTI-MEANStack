const mongoose = require('mongoose');
const { Schema } = mongoose;

const operacion = new Schema({
    fecha: {type: String},
    usuario: {type: String},
    tramite: {type: String},
    importe: {type: Number},
    idOperacion: {type: String},
    estado: {type: String}
},
{
    timestamps: true
}
);

module.exports = mongoose.model('ComprobantePago', operacion);