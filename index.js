import express  from "express"
import Connection from "./database/db.js"
import Route from './routes/route.js'
import bodyParser from "body-parser"
import cors from 'cors'
import path from 'path'
import dotenv from 'dotenv'

const corsOptions = {
  origin: 'https://653361ecbfae0c37e94fc717--aquamarine-muffin-72bae9.netlify.app/',
  optionsSuccessStatus: 200,
};



dotenv.config()

const app = express()
app.use(cors(corsOptions));
app.use(bodyParser.json({extended: true}))
app.use(bodyParser.urlencoded({extended: true}))
app.use('/', Route)

Connection()
const PORT = process.env.PORT || 8000

app.listen(PORT, ()=> console.log(`Server is successfully running on port ${PORT}`));
