const nodemailer = require('nodemailer');

const sendEmail = async (req,res) => {
  try {
    
    const {toMail, subject, content } = req.body


    let transporter = nodemailer.createTransport({
      host: process.env.MAIL_HOST, 
      port: 587, 
      secure: false,
      auth: {
        user: process.env.MAIL_MAIL, 
        pass: process.env.MAIL_PASS, 
      },
    });

    let mailOptions = {
        from: process.env.MAIL_MAIL , 
        to: toMail, 
        subject: subject, 
        text: JSON.stringify(content, null, 2)
      };


    let info = await transporter.sendMail(mailOptions);


    return res.status(200).json({ message:"mail succees" })
    
  } catch (error) {
    console.error('An error occurred while sending the mail:', error);
    return false 
  }
};


module.exports = {
    sendEmail,
}