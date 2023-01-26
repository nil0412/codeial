const nodeMailer = require('../config/nodemailer');

// this is another way of exporting a method
exports.forgotPassword = (email) => {
    
    let htmlString = nodeMailer.renderTemplate({email: email}, '/password/forgot_password.ejs');

    nodeMailer.transporter.sendMail({
    //    from: 'donotreply.codeial@gmail.com',
       from: 'mailer.codeial@gmail.com',
       to: email,
    //    to: 'nil041297@gmail.com',   
       subject: "Password Reset Link",
       html: htmlString 
    }, (err, info) => {
        if (err){
            console.log('****Error in sending mail****', err, '******');
            return;
        }

        console.log('Message sent', info);
        return;
    });
}