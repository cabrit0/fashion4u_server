const express = require("express");
const {
  createComment,
  getComments,
  getComment,
  updateComment,
  deleteComment,
} = require("../controllers/commentController");
const verifyJWT = require("../middleware/verifyJWT");

const router = express.Router({ mergeParams: true });

router.route("/").post(verifyJWT, createComment);
router.route("/").get(getComments);
router.route("/:id").get(getComment);
router.route("/:id").put(verifyJWT, updateComment);
router.route("/:id").delete(verifyJWT, deleteComment);

module.exports = router;
