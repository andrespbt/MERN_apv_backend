import nodemailer from 'nodemailer';

const emailRegistro = async datos => {
  // const transporter = nodemailer.createTransport({
  //   host: process.env.EMAIL_HOST,
  //   port: process.env.EMAIL_PORT,
  //   auth: {
  //     user: process.env.EMAIL_USER,
  //     pass: process.env.EMAIL_PASS
  //   }
  // });

  const Sib = require('sib-api-v3-sdk');
  require('dotenv').config();

  const client = Sib.ApiClient.instance;

  const apiKey = client.authentications['api-key'];
  apiKey.apiKey = process.env.API_KEY;

  const { email, nombre, token } = datos;

  const tranEmailApi = new Sib.TransactionalEmailsApi();

  const sender = {
    email: process.env.EMAIL_USER,
    name: 'APV Administrador de Pacientes de veterinaria'
  };

  const receivers = [
    {
      email: `${email}`
    }
  ];

  // Enviar el email

  tranEmailApi
    .sendTransacEmail({
      sender,
      to: receivers,
      subject: 'Comprueba tu cuenta en apv',
      textContent: `
      Comprueba tu cuenta en apv
        `,
      htmlContent: `
      <p>Hola ${nombre} comprueba tu cuenta en apv.</p>
      <p>Tu cuenta ya esta lista, solo debes comprobarla en el siguiente enlace: <a href="${process.env.FRONTEND_URL}/confirmar/${token}">Comprobar cuenta</a></p>
      <p>Si tú no creaste esta cuenta puedes ignorar este mensaje</p>
                `,
      params: {
        role: 'Frontend'
      }
    })
    .then(console.log)
    .catch(console.log);

  // const info = await transporter.sendMail({
  //   from: 'Apv administrador de pacientes de veterinaria',
  //   to: email,
  //   subject: 'Comprueba tu cuenta en apv',
  //   text: 'Comprueba tu cuenta en apv',
  //   html: `
  //   <p>Hola ${nombre} comprueba tu cuenta en apv.</p>
  //   <p>Tu cuenta ya esta lista, solo debes comprobarla en el siguiente enlace:
  //     <a href="${process.env.FRONTEND_URL}/confirmar/${token}">Comprobar cuenta</a>
  //   </p>
  //   <p>Si tú no creaste esta cuenta puedes ignorar este mensaje</p>
  //   `
  // });

  // console.log('Mensaje enviado: %s', info.messageId);
};

export default emailRegistro;
