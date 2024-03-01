'use strict'
import categoriasModel from '../categoria/categorias.model.js'
import categoriaModel from '../categoria/categorias.model.js'
import empresaModelo from './empresa.model.js'

export const agregarEmpresa = async(req,res)=>{
    try {
        let datos = req.body
        console.log(datos)
        let categoria = await categoriaModel.findOne({_id: datos.categoria})
      
        
          if(!categoria) return res.status (404).send({message: 'No se encotro la categoria'})
        let empresa = new empresaModelo(datos)
        await empresa.save()
        return res.send({message: 'Se agrego la empresa',empresa})
    } catch (err) {
        console.error(err)
        return res.status(500).send({message: 'Error al agregar una empresa'})
        
    }
}

export const listarA_Z = async(req,res)=>{
    try {
        let listarEmpresa = await empresaModelo.find()
        let categoria = await categoriasModel.find()
        return res.send(listarEmpresa)
    } catch (err) {
        console.error(err)
        return 
        
    }
}
export const listarZ_A = async(req,res)=>{
    try {
        let listarEmpresa = await empresaModelo.find().sort({nombre:-1})
        return res.send(listarEmpresa)
    } catch (err) {
        console.error(err)
        return 
        
    }
}