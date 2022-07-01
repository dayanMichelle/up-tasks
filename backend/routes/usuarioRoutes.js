import express from 'express'
import { registrar, confirmar,autenticar, olvidePassword, comprobarToken, nuevoPassword } from '../controllers/usuarioController.js'

const router = express.Router()

router.post("/",registrar)
router.post("/login", autenticar)
router.get("/confirmar/:token",confirmar)
router.post("/olvide-password",olvidePassword)
router.route("/olvide-password/:token")
.get(comprobarToken)
.post(nuevoPassword)

export default router