import { emailRegistro, emailRecuperar} from "../helpers/emai.js";
import generarId from "../helpers/generarId.js";
import generarJWT from "../helpers/generarJWT.js";
import Usuario from "../models/Usuario.js";

const registrar = async (req, res) => {
  //comprobando que no existe el email
  const { email } = req.body;
  const existeUsuario = await Usuario.findOne({ email });
  if (existeUsuario) {
    const error = new Error("El usuario ya está registrado ❌");
    return res.status(400).json({
      msg: error.message,
    });
  }
  //agregando usuario
  try {
    const usuario = new Usuario(req.body);
    console.log(usuario);
    usuario.token = generarId();
    await usuario.save();
    //mando correo
    emailRegistro({nombre: usuario.nombre, email: usuario.email , token: usuario.token})
    res.json({
      msg: "Usuario registrado correctamente. Revisa tu email para confirmar la cuenta ✨",
    });
    //TODO: enviar token al email del usuario
  } catch (error) {
    console.log(error);
  }
};

const confirmar = async (req, res) => {
  const { token } = req.params;
  const usuarioConfirmado = await Usuario.findOne({ token });
  if (!usuarioConfirmado) {
    const error = new Error("Token no válido ⚠️");
    res.status(403).json({
      msg: error.message,
    });
  }
  try {
    usuarioConfirmado.confirmado = true;
    usuarioConfirmado.token = "";
    await usuarioConfirmado.save();
    res.json({
      msg: "Confirmado 💜",
    });
  } catch (error) {
    console.log(error);
  }
};

const autenticar = async (req, res) => {
  const { email, password } = req.body;
  const usuario = await Usuario.findOne({ email });
  if (!usuario) {
    const error = new Error("El usuario no existe 😢");
    res.status(403).json({
      msg: error.message,
    });
  }
  if (usuario.confirmado == false) {
    const error = new Error("El usuario no está confirmado 🫢");
    res.status(403).json({
      msg: error.message,
    });
  }

  if (!(await usuario.comprobarPassword(password))) {
    const error = new Error("No coinciden la password 😱");
    return res.status(403).json({
      msg: error.message,
    });
  }

  res.json({
    _id: usuario._id,
    nombre: usuario.nombre,
    email: usuario.email,
    token: generarJWT(usuario._id),
  });
};

const olvidePassword = async (req, res) => {
  const { email } = req.body;
  const usuario = await Usuario.findOne({ email });
  if (!usuario) {
    const error = new Error("El usuario no existe");
    res.status(403).json({
      msg: error.message,
    });
  }
  try {
    usuario.token = generarId();
    await usuario.save();
    emailRecuperar({nombre: usuario.nombre, email: usuario.email , token: usuario.token})
    res.json({
        msg: 'Hemos enviado un correo para restablecer su contraseña 💫'
    })
  } catch (error) {
    console.log(error)
  }
};

export { registrar, confirmar, autenticar, olvidePassword };
