'use strict'

import { Router } from "express"
import { agregarEmpresa, listarA_Z, listarZ_A } from "./empresa.controlador.js"

const api = Router()
api.post('/agregarEmpresa',agregarEmpresa)
api.get('/ListarA_Z',listarA_Z)
api.get('/listarZ_A',listarZ_A)

export default api