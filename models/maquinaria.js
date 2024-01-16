import {Schema, model} from 'mongoose'

export {ModelMaquinaria}

const maquinariaSchema = Schema({
    seccion: {
        type: String,
        required: [true, 'El titulo es obligatorio']
    },
    titulo: {
        type: String,
        required: [true, 'El titulo es obligatorio']
    },
    descripcion: {
        type: String,
        required: [true, 'La descripcion es obligatorio']
    },
    riesgos:{
        type: Array,
        default: [{riesgo:"texto ejemplp....",probabilidad:"3",consecuencia:"1"}]
    },
    epis:{
        type: Array,
        default: ["idEpi1", "idEpi2"]
    },
    medidasPrev:{
        type: String,
        default: "Aqui se ponen la medidas para que la gente no se parta la crisma, aunque luego hacen lo que les da la gana"
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

const ModelMaquinaria = model('Maquinaria', maquinariaSchema)

