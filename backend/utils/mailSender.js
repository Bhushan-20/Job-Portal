const nodemailer = require("nodemailer");
require("dotenv").config();

const mailSender = async (email, title, body) => {
    try{
            let transporter = nodemailer.createTransport({
                host:process.env.MAIL_HOST,
                auth:{
                    user: process.env.MAIL_USER,
                    pass: process.env.MAIL_PASS,
                },
                tls: {
                    rejectUnauthorized: false
                }
            })

            let info = await transporter.sendMail({
                from:'"Jobify" <your-email@example.com>',
                to:`${email}`,
                subject: `${title}`,
                html: `${body}`,
            })
            return info;
    }
    catch(error) {
        console.error(error.message);
    }
}


module.exports = mailSender;