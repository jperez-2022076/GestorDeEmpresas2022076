'use strict'

import categoriaModel from '../categoria/categorias.model.js'
import empresaModelo from './empresa.model.js'
import exceljs from 'exceljs'
const workbook = new exceljs.Workbook()  
const worksheet = workbook.addWorksheet('Empresas')

const actualizarExcel = async () => {
    try {
       
    
        // Limpiar las filas existentes
        worksheet.spliceRows(2, worksheet.rowCount - 1)

        // Obtener todas las empresas
        const empresas = await empresaModelo.find()

        // Añadir datos de empresas al archivo Excel
        for (const empresa of empresas) {
            const { nombre, impacto, trayectoria, categoria } = empresa
            // Buscar el nombre de la categoría
            const categoriaBuscar = await categoriaModel.findById(categoria)
            const nombreCategoria = categoriaBuscar ? categoriaBuscar.categoria : ''
            worksheet.addRow([nombre, impacto, trayectoria, nombreCategoria])
        }
        // Guardar el archivo Excel
        const filePath = 'empresas.xlsx'
        await workbook.xlsx.writeFile(filePath)
    } catch (error) {
        console.error(error);
       res.status(500).send({message:'Error al actualizar el archivo Excel si tienes en excel abierto cerrarlo '})
    }
};


export const agregarEmpresa = async(req,res)=>{
    try {
        let datos = req.body
        console.log(datos)
        let categoria = await categoriaModel.findOne({_id: datos.categoria})
          if(!categoria) return res.status (404).send({message: 'No se encotro la categoria'})
        let empresa = new empresaModelo(datos)
        await empresa.save()
        await actualizarExcel()
        return res.send({message: 'Se agrego la empresa',empresa})
    } catch (err) {
        console.error(err)
        return res.status(500).send({message: 'Error al agregar una empresa'})
        
    }
}

export const listarA_Z = async(req,res)=>{
    try {
        let listarEmpresa = await empresaModelo.find().populate('categoria',['categoria']).sort({nombre:1})
        return res.send(listarEmpresa)
    } catch (err) {
        console.error(err)
        return 
        
    }
}
export const listarZ_A = async(req,res)=>{
    try {
        let listarEmpresa = await empresaModelo.find().populate('categoria',['categoria']).sort({nombre:-1})
        return res.send(listarEmpresa)
    } catch (err) {
        console.error(err)
        return 
        
    }
}
export const listarTrayectoria = async(req,res)=>{
    try {
        let listarEmpresa = await empresaModelo.find().populate('categoria',['categoria']).sort({trayectoria:1})
        return res.send(listarEmpresa)
    } catch (err) {
        return res.error(err)
        
    }
}

export const actualizarEmpresa = async(req,res)=>{
    try {
        let {uid} = req.params
        let datos = req.body
        let empresa = await empresaModelo.findOne({_id:uid})
        if(!empresa) return res.status(404).send({message:'No se encontro la empresa'})
        let empresaActualizada = await empresaModelo.findOneAndUpdate(
            {_id:uid},
            datos,
            {new:true}
        )
        await actualizarExcel()
        return res.send({message:'actualizado',empresaActualizada})
    } catch (err) {
        console.error(err)
    }
}

export const generarExcel = async (req, res) => {
    try {
        const workbook = new exceljs.Workbook()
        const worksheet = workbook.addWorksheet('Empresas')
        // Añadir encabezados
        worksheet.addRow(['Nombre', 'Impacto', 'Años de Trayectoria', 'Categoria'])
        // Obtener todas las empresas
        const empresas = await empresaModelo.find()
           // Añadir datos de empresas al archivo Excel
           for (const empresa of empresas) {
            const { nombre, impacto, trayectoria, categoria } = empresa
            // Buscar el nombre de la categoría
            const categoriaBuscar = await categoriaModel.findById(categoria)
            const nombreCategoria = categoriaBuscar ? categoriaBuscar.categoria : ''
            worksheet.addRow([nombre, impacto, trayectoria, nombreCategoria])
        }
        // Guardar el archivo Excel
        const filePath = 'empresas.xlsx'
        await workbook.xlsx.writeFile(filePath)

        res.status(200).send({message: 'Revisar la carpeta del proyecto excel generado',filePath})
    } catch (error) {
        console.error(error)
        res.status(500).send({message:'No se pudo agregar el Excel'})
    }
}
