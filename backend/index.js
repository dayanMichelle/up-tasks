import express from "express"
import dotenv from "dotenv"
import conectarDB from "./config/db.js"

const PORT = process.env.PORT || 4000
const app = express()

app.use(express.json())
dotenv.config()
conectarDB()

app.listen(PORT, () => console.log('Estoy conectada'))