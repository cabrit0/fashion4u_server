const express = require("express");
const router = express.Router();
const {
  register,
  login,
  getProfile,
  updateProfile,
  changePassword,
  deleteProfile,
  uploadAvatar,
  getAllUsers,
} = require("../controllers/userController");
const verifyJWT = require("../middleware/verifyJWT");
const fileUploadAndFirebase = require("../middleware/uploadPhoto");

router.post("/register", register);
router.post("/login", login);
router.get("/profile", verifyJWT, getProfile);
router.put("/profile", verifyJWT, updateProfile);
router.put("/password", verifyJWT, changePassword);
router.delete("/profile", verifyJWT, deleteProfile);
router.put(
  "/avatar/upload",
  verifyJWT,
  fileUploadAndFirebase("avatar"),
  uploadAvatar
);

router.get("/allUsers_", verifyJWT, getAllUsers);

module.exports = router;
