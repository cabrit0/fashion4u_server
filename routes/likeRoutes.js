const express = require("express");
const router = express.Router();

const {
  likeComment,
  likePost,
} = require("../controllers/likeController");
const verifyJWT = require("../middleware/verifyJWT");

router.route("/like/posts").put(verifyJWT, likePost);

router.route("/like/comments").put(verifyJWT, likeComment);

module.exports = router;
