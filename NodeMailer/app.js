const nodemailer = require('nodemailer');

// Create a transporter object using the default SMTP transport
let transporter = nodemailer.createTransport({
  host: 'api.particly.ml',
  port: 465, // SSL port
  secure: true, // use SSL
  auth: {
    user: 'noreply@api.particly.ml',
    pass: 'Fo108ih6?'
    }
});
// Generate a unique message ID
let messageId = Math.random().toString(36).substr(2) + Date.now() + '@api.particly.ml';

// Define the email options
let mailOptions = {
  from: '"Particly" <noreply@api.particly.ml>',
  to: 'rgi77773@omeie.com',
  subject: 'Test Email',
    text: 'This is a test email sent using nodemailer over SSL.',
    headers: {
        'Message-Id': messageId, // Set the message ID
        'References': messageId, // Set the references to include the message ID
        'Return-Path': 'rgi77773@omeie.com' // Set the return path to your email address
      }
};

// Send the email
transporter.sendMail(mailOptions, (error, info) => {
  if (error) {
    console.log(error);
  } else {
    console.log(`Email sent: ${info.response} Accepted Adresses: ${info.accepted} Rejected: ${info.rejected}`);
  }
});

