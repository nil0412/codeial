const nodeMailer = require('../config/nodemailer');
const env = require('../config/enviroment');

// this is another way of exporting a method
exports.newComment = (comment) => {
    
    let htmlString = nodeMailer.renderTemplate({comment: comment}, '/comments/new_comment.ejs');

    nodeMailer.transporter.sendMail({
        // from: 'felipe.wiegand60@ethereal.email',
        from: env.smtp.auth.user,
    //    from: 'mailer.codeial@gmail.com',
    //    from: 'donotreply.codeial@gmail.com',
       to: comment.user.email,
    //    to: 'nil041297@gmail.com',   
       subject: "New Comment Published!",
       html: htmlString 
    }, (err, info) => {
        if (err){
            console.log('****Error in sending mail****', err, '******');
            return;
        }

        // console.log('Message sent', info);
        return;
    });
}