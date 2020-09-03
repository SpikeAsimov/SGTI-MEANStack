const mongoose = require('mongoose');
const { Schema } = mongoose;

const operacion = new Schema({
    fecha: {type: String},
    usuario: {type: Schema.Types.ObjectId, ref: 'Users'},
    tramite: {type: String},
    importe: {type: Number},
    idOperacion: {type: Schema.Types.ObjectId},
    estado: {type: String}
},
{
    timestamps: true
}
);

module.exports = mongoose.model('ComprobantePago', operacion);