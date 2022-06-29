import generarId from '../helpers/generarId.js'
import Usuario from '../models/Usuario.js'

const registrar = async (req,res) => {
    //comprobando que no existe el email
    const { email } = req.body
    const existeUsuario = await Usuario.findOne({email})
    if(existeUsuario){
        const error = new Error('El usuario ya está registrado')
        return res.status(400).json({
            msg: error.message
        })
    }
    //agregando usuario
    try {
        const usuario = new Usuario(req.body)
        console.log(usuario)
        usuario.token = generarId()
        await usuario.save()
        res.json({
            msg: 'Usuario registrado correctamente'
        })
    } catch (error) {
        console.log(error)
    }
}

export {registrar}