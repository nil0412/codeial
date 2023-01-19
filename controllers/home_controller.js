const Post = require('../models/post');
const User = require('../models/user');

module.exports.home = async function(req, res){

    // console.log(req.cookies);
    // res.cookie('user_id', 25);   

    // Post.find({}, function(err, posts){
    //     return res.render('home.ejs', {
    //         title : 'Codial | Home',
    //         posts : posts
    //     });
    // });

    // // populate the user of each post
    // Post.find({})
    // .populate('user')
    // .populate({
    //     path: 'comments',
    //     populate: {
    //         path: 'user'
    //     }
    // })
    // .exec(function(err, posts){

    //     User.find({}, function(err, users){
    //         return res.render('home', {
    //             title : 'Codial | Home',
    //             posts : posts,
    //             all_users : users
    //         });
    //     });
    // });

    //same code using async awaits
    try{
        let posts = await Post.find({})
        .sort('-createdAt')
        .populate('user')
        .populate({
            path: 'comments',
            populate: {
                path: 'user'
            }
        });

        let users = await User.find({});

        return res.render('home', {
            title : 'Codial | Home',
            posts : posts,
            all_users : users
        });
    }catch(err){
        console.log("Error: ", err);
        return;
    }
}