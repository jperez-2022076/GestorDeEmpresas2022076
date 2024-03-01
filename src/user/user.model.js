import { Schema } from "mongoose"

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
        minLength:[8,'Contraseña muy pequeña'],
        required:true
    },
    email:{
        type:String,
        required:true
    },
    telefeno:{
        type: String,
        minLength :8,
        required:true
    }
})