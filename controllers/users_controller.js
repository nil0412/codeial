module.exports.profile = function(req, res){
    res.render('profile.ejs');
}

//render the sign up page
module.exports.signUp = function(req, res){
    return res.render('user_sign_up.ejs',{
        title: 'Codeial | Sign Up'
    });
}

//render the sign in page
module.exports.signIn = function(req, res){
    return res.render('user_sign_in.ejs',{
        title: 'Codeial | Sign In'
    });
}

//get the sign up data
module.exports.create = function(req, res){
    //TODO later
}

//create sign in session for the user
module.exports.createSession = function(req, res){
    //TODO later
}