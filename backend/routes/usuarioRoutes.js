import express from 'express'
import { registrar, confirmar,autenticar, olvidePassword } from '../controllers/usuarioController.js'

const router = express.Router()

router.post("/",registrar)
router.get("/confirmar/:token",confirmar)
router.post("/login", autenticar)
router.post("/olvide-password",olvidePassword)

export default router