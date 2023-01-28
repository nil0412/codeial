const nodeMailer = require('../config/nodemailer');

// this is another way of exporting a method
exports.forgotPasswordLink = (user) => {
    
    let htmlString = nodeMailer.renderTemplate({user: user}, '/password/forgot_password.ejs');

    nodeMailer.transporter.sendMail({
    //    from: 'donotreply.codeial@gmail.com',
    //    from: 'mailer.codeial@gmail.com',
        from: 'felipe.wiegand60@ethereal.email',
       to: user.email,
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