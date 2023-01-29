const asyncHandler = require("express-async-handler");
const Post = require("../models/Post");

const globalAllPosts = asyncHandler(async (req, res) => {
  const posts = await Post.find()
    .populate("comments.comment", ["text", "likes", "user"])
    .populate({
      path: "comments.comment",
      populate: [
        {
          path: "user",
          select: ["name", "avatar"],
        },
      ],
    })
    .populate("user", ["name", "avatar"]);
  console.log(posts);
  res.status(200).json({ success: true, data: posts });
});

module.exports = { globalAllPosts };
