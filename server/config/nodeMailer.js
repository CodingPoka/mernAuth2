


const nodeMailer=require("nodemailer");


require("dotenv").config();

//creating transporter

const transporter=nodeMailer.createTransport({
    host:"smtp-relay.brevo.com",
    port:587,
    auth:{
        user:process.env.SMTP_USER,
        pass:process.env.SMTP_PASS
    }
});

module.exports=transporter;