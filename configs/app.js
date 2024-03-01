
import  Express  from 'express'
import cors from 'cors'
import helmet from 'helmet'
import morgan from 'morgan'
import { config } from 'dotenv'

import categoriaRouter from '../src/categoria/categoria.routers.js'

const app = Express()
config()
const port = process.env.PORT

app.use(Express.urlencoded({extended:false}))
app.use(Express.json())
app.use(cors())
app.use(helmet())
app.use(morgan('dev'))

app.use(categoriaRouter)

export const initServer = ()=>{
    app.listen(port)
    console.log(`Esta en el puerto ${port}`)
}