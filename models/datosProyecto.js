import {Schema, model} from 'mongoose'

export {ModelDatosProyecto}

const datoProyectoSchema = Schema({
    inputs: {
        type: Array,
        required: true
    },
    estado: {
        type: Boolean,
        default: true,
        required: true,
    },
    usuario: {
        type: Schema.Types.ObjectId,
        ref: 'Usuario',
        required: true
    }
})

const ModelDatosProyecto = model('datosProyecto', datoProyectoSchema)
