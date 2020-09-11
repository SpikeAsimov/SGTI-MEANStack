const mongoose = require('mongoose');
const { Schema } = mongoose;

const data = new Schema({
    codigo: {type: Number, default: 0},
    apellido: { type: String, required: ['El apellido es requerido', true]},
    nombre: { type: String, required: ['El nombre es requerido', true]},
    estCivil: { type: String},
    tipoDoc: { type: String},
    numDoc: { type: String},
    nacionalidad: { type: String},
    fechNac: { type: String},
    apeConyu: { type: String},
    nomConyu: { type: String},
    domicilio: { type: String},
    objetoPedido: { type: String},
    ubicacionInmueble: { type: String},
    tipoTram: {type: String, required: true},
    producto: { type: Schema.Types.ObjectId, ref: 'TipoTramite'},
    estadoTram: {type: String, default: 'Iniciado'},
    area: { type: Schema.Types.ObjectId, ref: 'Area'},
    comprobantePago: { type: Schema.Types.ObjectId, ref: 'ComprobantePago'},
    usuario: { type: Schema.Types.ObjectId, ref: 'Users'}
},
{
    timestamps: true
}
);

module.exports = mongoose.model('Tramite', data);
