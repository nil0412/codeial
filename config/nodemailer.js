const nodemailer = require('nodemailer');
const ejs = require('ejs');
const path = require('path');

let transporter = nodemailer.createTransport({
    service: 'gmail',
    host: "smtp.gmail.com",
    port: 465,
    secure: true, // true for 465, false for other ports
    auth: {
    //   user: 'donotreply.codeial@gmail.com', // generated ethereal user
    //   pass: 'dymszymmorbbamvi', // generated ethereal password
      
      user: 'mailer.codeial@gmail.com', // generated ethereal user
      pass: 'jpjrvgdjnkjolukk', // generated ethereal password
    },
});

let renderTemplate = (data, relativePath) => {
    let mailHTML;
    ejs.renderFile(
        path.join(__dirname, '../views/mailers', relativePath),
        data,
        function(err, template){
            if(err){
                console.log("Error in rendering template", err);
                return;
            }

            mailHTML = template;
        }
    )
    return mailHTML;
}


module.exports = {
    transporter: transporter,
    renderTemplate: renderTemplate
}