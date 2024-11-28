import pkg from "jsonwebtoken";
import nodemailer from 'nodemailer';
const { sign } = pkg;

const secretString = "your-secret-key";
const jwtGenetation = ({ data }) =>
  sign(
    {
      exp: Math.floor(Date.now() / 1000) + 60 * 60,
      data: data,
    },
    secretString
  );


const sendMail = async () => {
  try {
    const transporter = nodemailer.createTransport({
      service: 'gmail', // Use your email service provider
      auth: {
        user: 'testingticket0@gmail.com', 
        pass: 'bjji xzed ejxj lpvy', 
      },
    });

    const mailOptions = {
      from: '"Your Name" <your-email@gmail.com>', // Sender address
      to: 'sameenabegum.s@skeintech.com', // List of recipients
      subject: 'Hello from Nodemailer', // Subject line
      text: 'This is a test email sent using Nodemailer.', // Plain text body
      html: '<p>This is a <b>test email</b> sent using Nodemailer.</p>', // HTML body
    };

    const info = await transporter.sendMail(mailOptions);

    console.log('Email sent:', info.messageId);
  } catch (error) {
    console.error('Error sending email:', error);
  }
};




export { jwtGenetation, sendMail };
