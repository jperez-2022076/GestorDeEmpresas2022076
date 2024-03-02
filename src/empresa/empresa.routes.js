'use strict'

import { Router } from "express"
import { actualizarEmpresa, agregarEmpresa, generarExcel, listarA_Z, listarTrayectoria, listarZ_A } from "./empresa.controlador.js"
import { validateJwt } from "../middlewares/validate-jwt.js"

const api = Router()
api.post('/agregarEmpresa',[validateJwt],agregarEmpresa)
api.get('/ListarA_Z',[validateJwt],listarA_Z)
api.get('/listarZ_A',[validateJwt],listarZ_A)
api.get('/listarTrayectoria',[validateJwt],listarTrayectoria)
api.put('/actualizarEmpresa/:uid',[validateJwt],actualizarEmpresa)
api.get('/AgregarExcel',[validateJwt],generarExcel)

export default api