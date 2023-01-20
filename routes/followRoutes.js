const express = require("express");
const router = express.Router();
const {followUser, unfollowUser} = require("../controllers/followController");
const verifyJWT = require("../middleware/verifyJWT");

router
  .route("/")
  .put(verifyJWT, followUser)
  .delete(verifyJWT, unfollowUser);

module.exports = router;
