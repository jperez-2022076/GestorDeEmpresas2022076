import { Schema, model } from "mongoose"


const UserSchema = Schema({
    nombre:{
        type:String,
        required: true
    },
    apellido:{
        type:String,
        required:true
    },
    usuario:{
        type:String,
        required:true
    },
    contraseña:{
        type:String,
        minLenght:[8,'Contraseña muy pequeña'],
        required: true
    },
    email:{
        type:String,
        required:true
    },
    telefono:{
        type: String,
        minLength :8,
        required:true
    }
})
export default model('usuario',UserSchema)