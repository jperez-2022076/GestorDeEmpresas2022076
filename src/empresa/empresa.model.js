import { Schema, model } from 'mongoose'
 
const empresaSchema = Schema({
    nombre: {
        type: String,
        required: true
    },
    impacto: {
        type: String,
        uppercase: true,
        enum: ['ALTO','MEDIO','BAJO'],
        required: true
    },
    trayectoria: {
        type: Number,
        required: true
    },
    categoria: {
        type: Schema.ObjectId,
        ref: 'categoria',
        required: true
    }
})
 
export default model('empresa', empresaSchema)