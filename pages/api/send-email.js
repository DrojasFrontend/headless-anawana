import nodemailer from 'nodemailer';

export default async function handler(req, res) {
  if (req.method === 'POST') {
    const { nombre, email, ocupacion, telefono, servicios, mensaje } = req.body;

    // Configura el transporter de Nodemailer
    const transporter = nodemailer.createTransport({
      service: 'gmail', // Puedes usar otro servicio como Outlook, Yahoo, etc.
      auth: {
        user: process.env.EMAIL_USER, // Tu correo electrónico
        pass: process.env.EMAIL_PASS, // Tu contraseña o contraseña de aplicación
      },
    });

    // Configura el correo electrónico
    const mailOptions = {
      from: process.env.EMAIL_USER, // Remitente
      to: process.env.EMAIL_TO, // Destinatario (puede ser el mismo o uno diferente)
      subject: `Nuevo mensaje de ${nombre}`, // Asunto del correo
      text: `
        Nombre: ${nombre}
        Email: ${email}
        Ocupación: ${ocupacion}
        Teléfono: ${telefono}
        Servicios: ${servicios}
        Mensaje: ${mensaje}
      `, // Cuerpo del correo en texto plano
      html: `
        <h1>Nuevo mensaje de ${nombre}</h1>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Ocupación:</strong> ${ocupacion}</p>
        <p><strong>Teléfono:</strong> ${telefono}</p>
        <p><strong>Servicios:</strong> ${servicios}</p>
        <p><strong>Mensaje:</strong> ${mensaje}</p>
      `, // Cuerpo del correo en HTML
    };

    try {
      // Envía el correo electrónico
      await transporter.sendMail(mailOptions);
      res.status(200).json({ message: 'Correo enviado con éxito' });
    } catch (error) {
      console.error('Error al enviar el correo:', error);
      res.status(500).json({ message: 'Error al enviar el correo' });
    }
  } else {
    res.status(405).json({ message: 'Método no permitido' });
  }
}