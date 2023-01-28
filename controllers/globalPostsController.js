const asyncHandler = require("express-async-handler");
const Post = require("../models/Post");

const globalAllPosts = asyncHandler(async (req, res) => {
  const posts = await Post.find();
  console.log(posts);
  res.status(200).json({ success: true, data: posts });
});

module.exports = { globalAllPosts };
