/*import nodemailer from "nodemailer"

const sendEmail=async(options)=>{
    var transport = nodemailer.createTransport({
        host: process.env.SMTP_HOST,
        port: process.env.SMTP_PORT,
        auth: {
          user: process.env.SMTP_EMAIL,
          pass: process.env.SMTP_PASSWORD
        }
      });

      const message ={
        from:`${process.env.SMTP_FROM_NAME} <${process.env.SMTP_FROM_EMAIL}>`,
        to:options.email,
        subject:options.message,
      }
      await transport.sendMail(message)
}
export default sendEmail;*/


import nodemailer from "nodemailer";

const sendEmail = async (options) => {
  try {
    // Create a transport using the environment variables
    var transport = nodemailer.createTransport({
      host: "sandbox.smtp.mailtrap.io",
      port: 2525,
      auth: {
        user: "b326d07fcb51a7",
        pass: "Mail12@#"
      }
    });

    // Define the email message
    const message = {
      from: `${process.env.SMTP_FROM_NAME} <${process.env.SMTP_FROM_EMAIL}>`,
      to: options.email,
      subject: options.subject,  // Assuming 'options.message' was meant to be 'options.subject'
      text: options.text,        // You may want to include the text body
      html: options.html,        // You may want to include the HTML body
    };

    // Send the email
    await transport.sendMail(message);

    console.log(`Email sent to ${options.email}`);
  } catch (error) {
    console.error(`Error sending email: ${error.message}`);
  } finally {
    // Close the transport
    transport.close();
  }
};

export default sendEmail;
