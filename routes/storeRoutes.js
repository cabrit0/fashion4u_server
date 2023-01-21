const express = require("express");
const {
  createStore,
  getStores,
  getStore,
  updateStore,
  deleteStore,
} = require("../controllers/storeController");

const router = express.Router();

const verifyJWT = require("../middleware/verifyJWT");

router.route("/").post(verifyJWT, createStore).get(getStores);
router
  .route("/:id")
  .get(getStore)
  .put(verifyJWT, updateStore)
  .delete(verifyJWT, deleteStore);

module.exports = router;
