'use strict'
import usuarioModelo from './user.model.js'

export const agregarUsuario = async(req,res)=>{
    try {
        let datos = req.body
        datos.contraseña = await encriptar(datos.contraseña)
        let user  = new usuarioModelo(datos)
        await user.save()
        return res.send({message: `Registro el usuario ${datos.usuario}, su nombre es ${datos.nombre} `})
    } catch (err) {
        console.error(err)
        return res.status(500).send({message: 'Error al agregar Usuario'})
        
    }
}
export const login = async(req,res)=>{
    try {
        let {email,usuario,contraseña}= req.body
        let user = await userModel.findOne({
            $or:[
                {usuario:usuario},
                {email:email}
            ]
        })
        if(user.estado == false){
            return res.send({message:'Se elimino esta cuenta no se puede iniciar sesion'})
        }
        if(user && await verificarContraseña(contraseña,user.contraseña)){
            let usuarioLogeado = {
                uid: user._id,
                usuario: user.usuario,
                nombre: user.nombre
              
            }
            let token = await generarJwt(usuarioLogeado)
            return res.send({message:`Bienvenido ${user.nombre}`,
            usuarioLogeado,
            token
        })
        }
        return res.status(404).send({message: 'Contraseña o usuario incorrecto'})
    } catch (err) {
        console.error(err)
        return res.status(500).send({message: 'Fallo al iniciar sesion'})
        
    }
}