import express  from "express"
import Connection from "./database/db.js"
import Route from './routes/route.js'
import bodyParser from "body-parser"
import cors from 'cors'
import path from 'path'
import dotenv from 'dotenv'




dotenv.config()

const app = express()
app.use(cors());
app.use(bodyParser.json({extended: true}))
app.use(bodyParser.urlencoded({extended: true}))
app.use('/', Route)

Connection()
const PORT = process.env.PORT || 8000

app.listen(PORT, ()=> console.log(`Server is successfully running on port ${PORT}`));
