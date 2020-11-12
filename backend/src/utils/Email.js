const nodemailer = require('nodemailer');
const BodyEmail = require('./EmailBody');

class Email {
    //Função de enviar o email
    sendEmail(request) {
        //Pegando os dados necessarios
        const { email, new_password } = request.body;

        //Criando o email
        var transporter = nodemailer.createTransport({
            service: process.env.Mailer_Service,
            host: process.env.Mailer_Host,
            port: process.env.Mailer_Port,
            secure: true,
            auth: {
                user: process.env.Ihealthy_Email,
                pass: process.env.Ihealthy_Pass
            }
        });
        var body = new BodyEmail(new_password);
        //Configurando o email
        var mailOptions = {
            from: process.env.Ihealthy_Email,
            to: email,
            subject: title,
            html: body.Email_html
        };
        //Enviando o email
        transporter.sendMail(mailOptions)
    }

}
module.exports = Email;

