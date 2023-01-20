const express = require("express");
const router = express.Router();

const {
  likeComment,
  unlikeComment,
  likePost,
  unlikePost,
} = require("../controllers/likeController");
const verifyJWT = require("../middleware/verifyJWT");

router
  .route("/like/posts")
  .put(verifyJWT, likePost)
  .put(verifyJWT, unlikePost);

router
  .route("/like/comments")
  .put(verifyJWT, likeComment)
  .put(verifyJWT, unlikeComment);

module.exports = router;
