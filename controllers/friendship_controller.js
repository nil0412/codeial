const User = require('../models/user');
const Friendship = require('../models/friendship');

module.exports.add = async function(req, res){
    try{
        let to_user = await User.findById(req.params.id);
        let from_user = await User.findById(req.user.id);

        let user_friendship_to = await User.findById(to_user).populate('friendship');
        let user_friendship_from = await User.findById(from_user).populate('friendship');

        let newFriendship = await Friendship.create({
            from_user: from_user,
            to_user: to_user
        });

        // user_friendship_to.friendship.push(newFriendship);
        user_friendship_to.friendship.push(from_user);
        user_friendship_to.save();

        // user_friendship_from.friendship.push(newFriendship);
        user_friendship_from.friendship.push(to_user);
        user_friendship_from.save();

        req.flash('success', 'Friend Added!');

        return res.redirect('back');

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
        let to_user = await User.findById(req.params.id);
        let from_user = await User.findById(req.user.id);

        let user_friendship_to = await User.findById(to_user).populate('friendship');
        let user_friendship_from = await User.findById(from_user).populate('friendship');
        
        let existingFriendship_1 = await Friendship.findOne({
            from_user: from_user,
            to_user: to_user
        });

        if(existingFriendship_1){
            // user_friendship_to.friendship.pull(existingFriendship_1);
            user_friendship_to.friendship.pull(from_user);
            user_friendship_to.save();

            // user_friendship_from.friendship.pull(existingFriendship_1);
            user_friendship_from.friendship.pull(to_user);
            user_friendship_from.save();

            existingFriendship_1.remove();
        }else{
            let existingFriendship_2 = await Friendship.findOne({
                from_user: to_user,
                to_user: from_user
            });

            user_friendship_to.friendship.pull(existingFriendship_2);
            user_friendship_to.save();

            user_friendship_from.friendship.pull(existingFriendship_2);
            user_friendship_from.save();

            existingFriendship_2.remove();
        }

        req.flash('success', 'Friend Removed');
        return res.redirect('back');

    }catch(err){
        console.log("In the friendship controller", err);
        req.flash('error', "Error in removing friend");
        return res.redirect('back');
    }
}