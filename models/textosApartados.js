import {Schema, model} from 'mongoose'

export {ModelTextos}

const TextosSchema = Schema({
    seccion: {
        type: String,
        required: [true, 'El titulo es obligatorio']
    },
    titulo: {
        type: String,
        required: [true, 'El titulo es obligatorio']
    },
    texto: {
        type: String,
        required: [true, 'La descripcion es obligatorio']
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
    },
    img: {
        type: String,
    },
    
})

const ModelTextos = model('Texto', TextosSchema)

