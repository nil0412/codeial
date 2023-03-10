const fs = require('fs');
const rfs = require('rotating-file-stream');
const path = require('path');

const logDirectory = path.join(__dirname, '../production_logs');
fs.existsSync(logDirectory) || fs.mkdirSync(logDirectory);

const accessLogStream = rfs.createStream('access.log', {
  interval: '1d', //rotate daily
  path: logDirectory
});

const development = {

    name: 'development',

    asset_path: './assets',
    
    session_cookie_key: 'blahSomething',
    
    db: 'codeial_development',
    
    smtp: {
        // host: 'smtp.ethereal.email',
        // port: 587,
        service: 'gmail',
        // secure: false, // true for 465, false for other ports
        auth: {
          user: "mailer.codeial@gmail.com",
          pass: "izqmjvwmayfuyuet"
          // user: 'antonette.stanton@ethereal.email',
          // pass: 'Sg4hC2pS1GET5DSfs5'
        }
    },
    
    google_client_id: "846020711379-ud1gq7l2aeuqpe8u0sjr3pglksk5cnbo.apps.googleusercontent.com",
    google_client_secret: "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",
    google_call_back_url: "http://localhost:8000/users/auth/google/callback",

    jwt_secret : 'codeial',

    morgan: {
      mode: 'dev',
      options: {stream:accessLogStream}
    }
}

const production = {
    name: 'production',

    asset_path: process.env.CODEIAL_ASSET_PATH,
    
    session_cookie_key: process.env.CODEIAL_SESSION_COOKIE_KEY,
    
    db: process.env.CODEIAL_DB,
    
    smtp: {
        // host: 'smtp.ethereal.email',
        // port: 587,
        service: 'gmail',
        // secure: false, // true for 465, false for other ports
        auth: {
          user: "mailer.codeial@gmail.com",
          pass: "izqmjvwmayfuyuet"
          // user: 'antonette.stanton@ethereal.email',
          // pass: 'Sg4hC2pS1GET5DSfs5'
        }
    },
    
    google_client_id: process.env.CODEIAL_GOOGLE_CLIENT_ID,
    google_client_secret: process.env.CODEIAL_GOOGLE_CLIENT_SECRET,
    google_call_back_url: process.env.CODEIAL_GOOGLE_CALL_BACK_URL,

    jwt_secret : process.env.CODEIAL_JWT_SECRET,

    morgan: {
      mode: 'combined',
      options: {stream:accessLogStream}
    }
}

module.exports = eval(process.env.CODEIAL_ENVIROMENT) == undefined ? development : eval(process.env.CODEIAL_ENVIROMENT);