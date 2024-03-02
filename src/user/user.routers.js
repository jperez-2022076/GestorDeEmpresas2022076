'use strict'

import { Router } from "express"
import { actualizar, agregarUsuario, eliminarUser, login } from "./user.controller.js"
import { validateJwt } from "../middlewares/validate-jwt.js"

const api = Router()

api.post('/agregarUsuario',agregarUsuario)
api.post('/login',login)
api.put('/actulizarUsuario/:uid',[validateJwt],actualizar)
api.delete('/eliminarUsuario/:uid',[validateJwt],eliminarUser)
export default api