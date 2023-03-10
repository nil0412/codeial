const User = require('../models/user');
const Friendship = require('../models/friendship');
const fs = require('fs');
const path = require('path');


// let's keep it same as before
// module.exports.profile = function(req, res){
//     User.findById(req.params.id, function(err, user){
//         return res.render('user_profile', {
//             title: 'User Profile',
//             profile_user: user
//         });
//     });

// }

// let's keep it same as before
module.exports.profile = function(req, res){
    User.findById(req.params.id, async function(err, user){
        try{
            let to_user = await User.findById(req.params.id);
            let from_user = await User.findById(req.user.id);

            let isFriend = false;
            
            let existingFriendship_1 = await Friendship.findOne({
                from_user: from_user,
                to_user: to_user
            });

            let existingFriendship_2 = await Friendship.findOne({
                from_user: to_user,
                to_user: from_user
            });

            if(existingFriendship_1 || existingFriendship_2){
                isFriend = true;
            }
            if(isFriend){
                return res.render('user_profile_remove', {
                    title: 'User Profile',
                    profile_user: user
                });
            }
            else{
                return res.render('user_profile_add', {
                    title: 'User Profile',
                    profile_user: user
                });
            }
        }catch(err){
            console.log(err);
            return res.redirect('back');
        }
    });
}


module.exports.update = async function(req, res){
    // if(req.user.id == req.params.id){
    //     User.findByIdAndUpdate(req.params.id, req.body, function(err, user){
    //         req.flash('success', 'Updated!');
    //         return res.redirect('back');
    //     });
    // }else{
    //     req.flash('error', 'Unauthorized!');
    //     return res.status(401).send('Unauthorized');
    // }

    if(req.user.id == req.params.id){
        try{
            let user = await User.findById(req.params.id);
            User.uploadedAvatar(req, res, function(err){
                if(err){
                    console.log("*****Multer Error", err);                
                }

                user.name = req.body.name;
                user.email = req.body.email;

                if(req.file){

                    if(user.avatar){
                        fs.unlinkSync(path.join(__dirname , '..' , user.avatar));   
                    }

                    //this is saving the path of uploaded file in the avatar field in the user
                    user.avatar = User.avatarPath + '/' + req.file.filename;
                }

                user.save();
                return res.redirect('back');
            });

        }catch{
            req.flash('error', err);
            return res.redirect('back');
        }
    }else{
        req.flash('error', 'Unauthorized!');
        return res.status(401).send('Unauthorized');
    }

}


// render the sign up page
module.exports.signUp = function(req, res){
    if (req.isAuthenticated()){
        return res.redirect('/users/profile');
    }


    return res.render('user_sign_up', {
        title: "Codeial | Sign Up"
    })
}


// render the sign in page
module.exports.signIn = function(req, res){

    if (req.isAuthenticated()){
        return res.redirect('/users/profile');
    }
    return res.render('user_sign_in', {
        title: "Codeial | Sign In"
    })
}

// get the sign up data
module.exports.create = function(req, res){
    if (req.body.password != req.body.confirm_password){
        req.flash('error', 'Passwords do not match');
        return res.redirect('back');
    }

    User.findOne({email: req.body.email}, function(err, user){
        if(err){req.flash('error', err); return}

        if (!user){
            User.create(req.body, function(err, user){
                if(err){req.flash('error', err); return}

                return res.redirect('/users/sign-in');
            })
        }else{
            req.flash('success', 'You have signed up, login to continue!');
            return res.redirect('back');
        }

    });
}

//create sign in session for the user
module.exports.createSession = function(req, res){

    //flash meaage on sign-in
    req.flash('success', 'Logged in Successfully');

    return res.redirect('/');
}

//sign out action
module.exports.destroySession = function(req, res){

    //this function is provided by passport.js
    req.logout(function(err) {
        if (err) { 
            console.log('Error in logout --> Passport'); }
      });

    //flash meaage on sign-out
    req.flash('success', 'You have logged out!');


    return res.redirect('/');
}

