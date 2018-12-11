const mongoosee = require('mongoosee');

let Schema = mongoosee.Schema;

let habitacionSchema = new Schema({

    tipo: {
        type: String,
        required: true,
    },
    nombre: {
        type: String,
        required: true,
    },
    ocupacion_max: {
        type: Number,
        required: true,
    },
    descripcion: {
        type: String,
        required: true,
    },
    max_children: {
        type: Number,
        required: true,
    },
    camas_disponibles: [{
        cama: { type: Schema.ObjectId, ref: "Cama" } ,
        cantidad: { type: Number, required: true}
    }]

});

module.exports = mongoose.model('Habitacion', habitacionSchema);
