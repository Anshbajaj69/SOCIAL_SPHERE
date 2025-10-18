import bcrypt from 'bcryptjs';
import {v2 as cloudinary} from 'cloudinary';

import User from "../models/user.model.js";
import Notification from "../models/notification.model.js"

export const getUserProfile = async (req, res) => {
  try {
    const { username } = req.params;
    if (!username?.trim()) {
      return res.status(400).json({ error: "Username is required" });
    }

    const user = await User.findOne({ username }).select("-password");

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    res.status(200).json(user);
  } catch (error) {
    console.error("Error in getUserProfile:", error.message);
    res.status(500).json({ error: "Internal server error" });
  }
};

export const followUnfollowUser = async (req, res) => {
  try {
    const { id } = req.params; // target user’s ID (to follow/unfollow)
    const currentUserId = req.user._id; // logged-in user’s ID

    //  Prevent self-follow/unfollow
    if (id === currentUserId.toString()) {
      return res.status(400).json({ error: "You cannot follow or unfollow yourself" });
    }

    //  Check if both users exist
    const userToModify = await User.findById(id);
    if (!userToModify) {
      return res.status(404).json({ error: "Target user not found" });
    }

    //  Determine follow/unfollow state
    const isAlreadyFollowing = req.user.following.includes(id);

    if (isAlreadyFollowing) {
      //  Unfollow logic
      await Promise.all([
        User.findByIdAndUpdate(id, { $pull: { followers: currentUserId } }),
        User.findByIdAndUpdate(currentUserId, { $pull: { following: id } }),
      ]);

      return res.status(200).json({ message: "User unfollowed successfully" });
    } else {
      //  Follow logic
      await Promise.all([
        User.findByIdAndUpdate(id, { $push: { followers: currentUserId } }),
        User.findByIdAndUpdate(currentUserId, { $push: { following: id } }),
      ]);

      // Create a notification asynchronously (no need to block response)
      await Notification.create({
        type: "follow",
        from: currentUserId,
        to: userToModify._id,
      });

      return res.status(200).json({ message: "User followed successfully" });
    }
  } catch (error) {
    console.error("Error in followUnfollowUser:", error.message);
    res.status(500).json({ error: "Internal server error" });
  }
};

export const getSuggestedUsers = async (req,res)=>{
    try{
        const userId = req.user._id;
        const usersFollowedByMe = await User.findById(userId).select("following");

        const users = await User.aggregate([
            {
                $match:{
                    _id: {$ne:userId}
                }
            },
            {
                $sample:{
                    size:10
                }
            }
        ])
        const filterUsers = users.filter(user=>!usersFollowedByMe.following.includes(user._id));
        const suggestedUsers = filterUsers.slice(0,4)
        suggestedUsers.forEach(user=>user.password=null)
        res.status(200).json(suggestedUsers)
    }catch(error){
        res.status(500).json({error: error.message});
    }
}

export const updateUser = async (req,res)=>{
    const{fullName,username, email, currentPassword, newPassword, bio, link} = req.body;
    let { profileImg, coverImg}=req.body;

    const userId = req.user._id;

    try{
        let user = await User.findById(userId);
        if(!user)return res.status(404).json({message: "User Not Found"});
        if((!newPassword&& currentPassword) || (!currentPassword && newPassword)){
            return res.status(404).json({error: "Please provide both current password and new password"});
        }
        if( currentPassword && newPassword){
            const isMatch = await bcrypt.compare(currentPassword, user.password);
            if(!isMatch){
                return res.status(400).json({error: "current password is incorrect"});
            }
            if(newPassword.length<6){
                    return res.status(400).json({error:"password must be atleast 6 characters long"})
            }
            const salt = await bcrypt.genSalt(10);
            user.password = await bcrypt.hash(newPassword,salt);
        }
        if(profileImg){
            if(user.profileImg){
                await cloudinary.uploader.destroy(user.profileImg.split("/")).pop().split(".")[0];
            }
            const uploadedResponse = await cloudinary.uploader.upload(profileImg);
            profileImg = uploadedResponse.secure_url;
        }

        if(coverImg){
             if(user.coverImg){
                await cloudinary.uploader.destroy(user.coverImg.split("/")).pop().split(".")[0];
            }
            const uploadedResponse = await cloudinary.uploader.upload(coverImg);
            coverImg = uploadedResponse.secure_url;
        }

        user.fullName = fullName || user.fullName;
        user.email = email || user.email;
        user.username = username || user.username;
        user.bio = bio || user.bio
        user.link = link || user.link
        user.profileImg = profileImg || user.profileImg;
        user.coverImg = coverImg || user.coverImg;

        user = await user.save();
        // password should be null in the response
        user.password = null;
        return res.status(200).json(user);

    }catch(error){
        console.log("error in updateUser: ", error.message);
        res.status(500).json({error: error.message})
    }
}