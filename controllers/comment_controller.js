const Comment = require('../models/comment');
const Post = require('../models/post');

module.exports.create = function(req, res){
    Post.findById(req.body.post, function(err, post){
        
        if(post){
            Comment.create({
                content: req.body.content,
                user: req.user._id,
                post: req.body.post  
            },function(err, comment){
                if(err){
                    console.log("error in creating the post");
                    return;
                }
                //mongodb update
                post.comments.push(comment);
                post.save();

                res.redirect('/');
            });
        }
    });
}


module.exports.destroy = function(req, res){
    
    Comment.findById(req.params.id, function(err, comment){
        
        
        if(comment.user == req.user.id){

            //we also need to delete comment from Post schema
            let postId = comment.post;

            comment.remove();

            Post.findByIdAndUpdate(postId, { $pull: {comments: req.params.id}}, function(err, post){
                return res.redirect('back');
            });
        }else{
            return res.redirect('back');
        }
    });
}