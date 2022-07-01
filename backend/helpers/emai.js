import nodemailer from 'nodemailer'

export const emailRegistro = async ({email,nombre,token}) => {
    const transport = nodemailer.createTransport({
        host: process.env.HOST,
        port: process.env.PORT,
        auth: {
          user: process.env.USER,
          pass: process.env.PASS
        }
      });
    const info = await transport.sendMail({
        from: 'upTasks - Admistrador de Proyectos',
        to: email,
        subject: 'upTasks Compruba tu cuenta',
        text: 'Compruba tu cuenta ✔️',
        html: `
        <h1>Hola ${nombre}</h1>
        <p>Compruba tu cuenta en upTasks</p>
        <p>Tu cuenta ya está lista. Solo debes comprobarla con el siguiente enlace: <a href="${process.env.URL}/confirmar/${token}">Comprobar cuenta ✨</a></p>
        <p>Si no creaste una cuenta, puedes ignorar este mensaje.</p>
        `

    })
}
export const emailRecuperar = async ({email,nombre,token}) => {
    const transport = nodemailer.createTransport({
        host: process.env.HOST,
        port: process.env.PORT,
        auth: {
          user: process.env.USER,
          pass: process.env.PASS
        }
      });
    const info = await transport.sendMail({
        from: 'upTasks - Admistrador de Proyectos',
        to: email,
        subject: 'upTasks Restrablece tu contraseña',
        text: 'Restrablece tu contraseña ✔️',
        html: `
        <h1>Hola ${nombre}</h1>
        <p>Restrablece tu contraseña en upTasks</p>
        <p>Para cambiar tu contraseña has click en el enlace: <a href="${process.env.URL}/olvide-password/${token}">Comprobar cuenta ✨</a></p>
        `

    })
}