const express = require("express");
const {
  addClothingToStore,
  removeClothingFromStore,
} = require("../controllers/clothingController");
const verifyJWT = require("../middleware/verifyJWT");
const uploadClothesPhotos = require("../middleware/uploadClothesPhoto");

const router = express.Router();

router
  .route("/addClothing")
  .post(verifyJWT, addClothingToStore);

router
  .route("/:storeId/clothing/:clothingId")
  .delete(verifyJWT, removeClothingFromStore);

module.exports = router;
