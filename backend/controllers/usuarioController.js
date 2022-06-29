import generarId from '../helpers/generarId.js'
import Usuario from '../models/Usuario.js'

const registrar = async (req,res) => {
    //comprobando que no existe el email
    const { email } = req.body
    const existeUsuario = await Usuario.findOne({email})
    if(existeUsuario){
        const error = new Error('El usuario ya está registrado ❌')
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
            msg: 'Usuario registrado correctamente. Revisa tu email para confirmar la cuenta ✨'
        })
        //TODO: enviar token al email del usuario
    } catch (error) {
        console.log(error)
    }
}


const confirmar = async (req,res) => {
    const { token } = req.params
    const usuarioConfirmado = await Usuario.findOne({token})
    if(!usuarioConfirmado){
        const error = new Error('Token no válido ⚠️')
        res.status(403).json({
            msg: error.message
        })
    }
    try {
        usuarioConfirmado.confirmado = true
        usuarioConfirmado.token = ''
        await usuarioConfirmado.save()
        res.json({
            msg: 'Confirmado 💜'
        })
    } catch (error) {
        console.log(error)
    }

}
export {
    registrar,
    confirmar
}