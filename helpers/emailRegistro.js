import nodemailer from 'nodemailer';

const emailRegistro = async datos => {
  const transporter = nodemailer.createTransport({
    host: process.env.EMAIL_HOST,
    port: process.env.EMAIL_PORT,
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS
    }
  });

  const { email, nombre, token } = datos;

  // Enviar el email

  const info = await transporter.sendMail({
    from: '"Apv administrador de pacientes de veterinaria" <apv@correo.com>',
    to: `${email}`,
    subject: 'Comprueba tu cuenta en apv',
    text: 'Comprueba tu cuenta en apv',
    html: `
    <p>Hola ${nombre} comprueba tu cuenta en apv.</p>
    <p>Tu cuenta ya esta lista, solo debes comprobarla en el siguiente enlace:
      <a href="${process.env.FRONTEND_URL}/confirmar/${token}">Comprobar cuenta</a>
    </p>
    <p>Si tú no creaste esta cuenta puedes ignorar este mensaje</p>
    `
  });

  console.log('Mensaje enviado: %s', info.messageId);
};

export default emailRegistro;
