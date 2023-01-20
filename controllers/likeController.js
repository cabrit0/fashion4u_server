const asyncHandler = require("express-async-handler");
const Post = require("../models/Post");
const Comment = require("../models/Comment");

// @desc    Like a post
// @route   PUT /api/posts/:id/like
// @Access  Private
const likePost = asyncHandler(async (req, res) => {
  const post = await Post.findById(req.body.postId);

  if (!post) {
    return res.status(404).json({ success: false, error: "Post not found" });
  }

  // Check if user has already liked the post
  if (
    post.likes.filter((like) => like.user.toString() === req.user.id).length > 0
  ) {
    return res
      .status(400)
      .json({ success: false, error: "Post already liked" });
  }

  post.likes.unshift({ user: req.user.id });

  await post.save();

  res.status(200).json({ success: true, data: post.likes });
});

// @desc    Unlike a post
// @route   PUT /api/posts/:id/unlike
// @Access  Private
const unlikePost = asyncHandler(async (req, res) => {
  const post = await Post.findById(req.body.postId);

  if (!post) {
    return res.status(404).json({ success: false, error: "Post not found" });
  }

  // Check if user has not yet liked the post
  if (
    post.likes.filter((like) => like.user.toString() === req.user.id).length ===
    0
  ) {
    return res
      .status(400)
      .json({ success: false, error: "Post has not yet been liked" });
  }

  // Get remove index
  const removeIndex = post.likes
    .map((like) => like.user.toString())
    .indexOf(req.user.id);

  post.likes.splice(removeIndex, 1);

  await post.save();

  res.status(200).json({ success: true, data: post.likes });
});

// @desc    Like a comment
// @route   PUT /api/comments/:id/like
// @Access  Private
const likeComment = asyncHandler(async (req, res) => {
  const comment = await Comment.findById(req.body.commentId);

  if (!comment) {
    return res.status(404).json({ success: false, error: "Comment not found" });
  }

  // Check if user has already liked the comment
  if (
    comment.likes.filter((like) => like.user.toString() === req.user.id)
      .length > 0
  ) {
    return res
      .status(400)
      .json({ success: false, error: "Comment already liked" });
  }

  comment.likes.unshift({ user: req.user.id });
  await comment.save();

  res.status(200).json({ success: true, data: comment.likes });
});

// @desc Unlike a comment
// @route PUT /api/comments/:id/unlike
// @Access Private
const unlikeComment = asyncHandler(async (req, res) => {
  const comment = await Comment.findById(req.body.commentId);

  if (!comment) {
    return res.status(404).json({ success: false, error: "Comment not found" });
  }

  // Check if user has not yet liked the comment
  if (
    comment.likes.filter((like) => like.user.toString() === req.user.id)
      .length === 0
  ) {
    return res
      .status(400)
      .json({ success: false, error: "Comment has not yet been liked" });
  }

  // Get remove index
  const removeIndex = comment.likes
    .map((like) => like.user.toString())
    .indexOf(req.user.id);

  comment.likes.splice(removeIndex, 1);

  await comment.save();

  res.status(200).json({ success: true, data: comment.likes });
});

module.exports = {
  likePost,
  unlikePost,
  likeComment,
  unlikeComment,
};
