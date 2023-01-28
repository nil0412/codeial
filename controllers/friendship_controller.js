const User = require('../models/user');
const Friendship = require('../models/friendship');

module.exports.add = async function(req, res){
    try{
        let to_user = await User.findById(req.params.id);
        let from_user = await User.findById(req.user.id);

        let isFriend = false;

        let user_friendship = await User.findById(from_user).populate('friendship');
        
        let existingFriendship_1 = await Friendship.findOne({
            from_user: from_user,
            to_user: to_user
        });

        let existingFriendship_2 = await Friendship.findOne({
            from_user: to_user,
            to_user: from_user
        });

        if(!(existingFriendship_1 || existingFriendship_2)){
            let newFriendship = await Friendship.create({
                from_user: from_user,
                to_user: to_user
            });

            user_friendship.friendship.push(newFriendship);
            user_friendship.save();

            isFriend = true;

            req.flash('success', 'Friend Added!');
        }

    //     return res.redirect('back');

    // }catch(err){
    //     req.flash('error', err);
    //     return res.redirect('back');
    // }
        return res.json(200, {
            message: "Request successful!",
            data: {
                isFriend: isFriend
            }
        });

    }catch(err){
        console.log(err);
        return res.json(500, {
            message: 'Internal Server Error'
        });
    }
}

module.exports.remove = async function(req, res){
    console.log("In the friendship controller");
    try{
        console.log("In the friendship controller");
        let to_user = await User.findById(req.params.id);
        let from_user = await User.findById(req.user.id);
        let friendship_remove = await Friendship.create({
            from_user: from_user,
            to_user: to_user
        });

        req.flash('success', 'Friend Removed');
        return res.redirect('back');

    }catch(err){
        console.log("In the friendship controller", err);
        req.flash('error', err);
        return res.redirect('back');
    }
}