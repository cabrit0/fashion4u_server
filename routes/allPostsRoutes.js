const express = require("express");
const router = express.Router();
const { globalAllPosts } = require("../controllers/globalPostsController");
const verifyJWT = require("../middleware/verifyJWT");

router.get("/", verifyJWT, globalAllPosts);

module.exports = router;
