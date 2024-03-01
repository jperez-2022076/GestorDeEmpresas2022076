'use strict'

import  Express  from "express"
import { actulizarCategoria,agregarCategoria, /* eliminarCategoria */ listarCategoria } from "./categoria.controller.js"



const api = Express.Router()



api.get('/listarCategoria',listarCategoria)
api.post('/agregarCategorias',agregarCategoria)
api.put('/actualizarCategoria/:id',actulizarCategoria)
/* api.delete('/eliminarCategoria/:id',eliminarCategoria) */
export default api