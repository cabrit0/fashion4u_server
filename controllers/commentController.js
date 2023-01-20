const asyncHandler = require("express-async-handler");
const Comment = require("../models/Comment");

// @desc    Create a comment
// @route   POST /api/comments
// @Access  Private
const createComment = asyncHandler(async (req, res) => {
  const { text } = req.body;
  const post = req.body.postId;
  const user = req.user.id;

  const comment = await Comment.create({
    text,
    post,
    user,
  });

  res.status(201).json({ success: true, data: comment });
});

// @desc    Get all comments for a post
// @route   GET /api/comments/:postId
// @Access  Public
const getComments = asyncHandler(async (req, res) => {
  const comments = await Comment
    .find({ post: req.body.postId })
    .populate("user", ["name"]);
    console.log(req.body)

  res.status(200).json({ success: true, data: comments });
});

// @desc    Get a single comment
// @route   GET /api/comments/:id
// @Access  Public
const getComment = asyncHandler(async (req, res) => {
  const comment = await Comment
    .findById(req.params.id)
    .populate("user", ["name"]);

  if (!comment) {
    return res.status(404).json({ success: false, error: "Comment not found" });
  }

  res.status(200).json({ success: true, data: comment });
});

// @desc Update a comment
// @route PUT /api/comments/:id
// @Access Private
const updateComment = asyncHandler(async (req, res) => {
  const comment = await Comment.findById(req.params.id);
  if (!comment) {
    return res.status(404).json({ success: false, error: "Comment not found" });
  }

  // Make sure user is comment owner
  if (comment.user.toString() !== req.user.id) {
    return res.status(401).json({ success: false, error: "Not authorized" });
  }

  const updatedComment = await Comment.findByIdAndUpdate(
    req.params.id,
    req.body,
    {
      new: true,
      runValidators: true,
    }
  );

  res.status(200).json({ success: true, data: updatedComment });
});

// @desc Delete a comment
// @route DELETE /api/comments/:id
// @Access Private
const deleteComment = asyncHandler(async (req, res) => {
  const comment = await Comment.findById(req.params.id);
  if (!comment) {
    return res.status(404).json({ success: false, error: "Comment not found" });
  }

  // Make sure user is comment owner
  if (comment.user.toString() !== req.user.id) {
    return res.status(401).json({ success: false, error: "Not authorized" });
  }

  await Comment.findByIdAndDelete(req.params.id);

  res.status(200).json({ success: true, data: {} });
});

module.exports = {
  createComment,
  getComments,
  getComment,
  updateComment,
  deleteComment,
};
