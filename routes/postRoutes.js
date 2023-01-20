const express = require("express");
const router = express.Router();
const {
  createPost,
  getPosts,
  getPost,
  updatePost,
  deletePost,
} = require("../controllers/postController");
const verifyJWT = require("../middleware/verifyJWT");
const uploadPostPhoto = require("../middleware/uploadPostPhoto");
const parseRequestBody = require("../middleware/parseRequestBody");

router.post(
  "/",
  verifyJWT,
  uploadPostPhoto("image"),
  parseRequestBody,
  createPost
);
router.get("/", getPosts);
router.get("/:id", getPost);
router.put(
  "/:id",
  verifyJWT,
  uploadPostPhoto("image"),
  parseRequestBody,
  updatePost
);
router.delete("/:id", verifyJWT, deletePost);

module.exports = router;
