const asyncHandler = require("express-async-handler");
const User = require("../models/User");

// @desc Follow a user
// @route POST /api/follow
// @Access Private
const followUser = asyncHandler(async (req, res) => {
  //console.log(req.body, req.user)
  const loggedInUser = await User.findById(req.user.id);
  const targetUser = await User.findById(req.body.userId);

  if (!targetUser) {
    return res.status(404).json({ success: false, error: "User not found" });
  }

  // Check if already following
  if (loggedInUser.following.includes(req.body.userId)) {
    return res
      .status(400)
      .json({ success: false, error: "Already following this user" });
  }

  loggedInUser.following.push(req.body.userId);
  await loggedInUser.save();

  targetUser.followers.push(req.user.id);
  await targetUser.save();

  res.status(200).json({ success: true, data: loggedInUser });
});

// @desc Unfollow a user
// @route DELETE /api/follow
// @Access Private
const unfollowUser = asyncHandler(async (req, res) => {
  const loggedInUser = await User.findById(req.user.id);
  const targetUser = await User.findById(req.body.userId);

  if (!targetUser) {
    return res.status(404).json({ success: false, error: "User not found" });
  }

  // Check if already following
  if (!loggedInUser.following.includes(req.body.userId)) {
    return res
      .status(400)
      .json({ success: false, error: "Not following this user" });
  }

  loggedInUser.following.pull(req.body.userId);
  await loggedInUser.save();

  targetUser.followers.pull(req.user.id);
  await targetUser.save();

  res.status(200).json({ success: true, data: loggedInUser });
});

module.exports = {
  followUser,
  unfollowUser,
};
