import nodemailer from "nodemailer";

export const sendEmail = async (
  customer_name: string,
  email: string,
  movie: string,
  room: string,
  date: Date,
  seats: string
) => {
  const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 465,
    secure: true,
    auth: {
      user: "jsebastiannieto1716@gmail.com",
      pass: "wqui fplu mtva memd",
    },
  });

  const correctDate = new Date(date);
  const textDate = correctDate.toLocaleString("es-ES", {
    day: "numeric",
    month: "long",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });

  const mailOptions = {
    from: '"Cinema Kata" <jsebastiannieto1716@gmail.com>',
    to: email,
    subject: "Tu reserva en Cinema Kata 🎥😁",
    text: `Gracias ${customer_name} por reservar en Cinema Kata, todo listo para que veas ${movie}, en la sala ${room}, en los asientos ${seats} el ${textDate}`,
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      return console.error("Error al enviar correo:", error);
    }
    console.log("Correo enviado:", info.messageId);
  });
};
