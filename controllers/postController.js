const asyncHandler = require("express-async-handler");
const Post = require("../models/Post");

// @desc    Create a post
// @route   POST /api/posts
// @Access  Private
const createPost = asyncHandler(async (req, res) => {
  const { text, brands, clothes } = req.body;
  const image = req.image;
  const user = req.user.id;

  const post = await Post.create({
    text,
    brands,
    clothes,
    image,
    user,
  });

  res.status(201).json({ success: true, data: post });
});

// @desc    Get all posts
// @route   GET /api/posts
// @Access  Public
const getPosts = asyncHandler(async (req, res) => {
  const posts = await Post.find().populate("user", ["name"]);

  res.status(200).json({ success: true, data: posts });
});

// @desc    Get a single post
// @route   GET /api/posts/:id
// @Access  Public
const getPost = asyncHandler(async (req, res) => {
  const post = await Post.findById(req.params.id).populate("user", ["name"]);

  if (!post) {
    return res.status(404).json({ success: false, error: "Post not found" });
  }

  res.status(200).json({ success: true, data: post });
});

// @desc Update a post
// @route PUT /api/posts/:id
// @Access Private
const updatePost = asyncHandler(async (req, res) => {
  const post = await Post.findById(req.params.id);
  if (!post) {
    return res.status(404).json({ success: false, error: "Post not found" });
  }

  // Make sure user is post owner
  if (post.user.toString() !== req.user.id) {
    return res.status(401).json({ success: false, error: "Not authorized" });
  }
  //console.log(req.body)

  const updatedPost = await Post.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
  });

  res.status(200).json({ success: true, data: updatedPost });
});

// @desc Delete a post
// @route DELETE /api/posts/:id
// @Access Private
const deletePost = asyncHandler(async (req, res) => {
  const post = await Post.findById(req.params.id);
  if (!post) {
    return res.status(404).json({ success: false, error: "Post not found" });
  }

  // Make sure user is post owner
  if (post.user.toString() !== req.user.id) {
    return res.status(401).json({ success: false, error: "Not authorized" });
  }

  await post.remove();

  res.status(200).json({ success: true, data: {} });
});

module.exports = {
  createPost,
  getPost,
  getPosts,
  updatePost,
  deletePost,
};
