const express = require("express");
const {
  createBrand,
  getBrands,
  getBrand,
  updateBrand,
  deleteBrand,
} = require("../controllers/brandController");
const uploadBrandPhoto = require("../middleware/uploadBrandPhoto");
const verifyJWT = require("../middleware/verifyJWT");

const router = express.Router();

router
  .route("/")
  .get(getBrands)
  .post(verifyJWT, uploadBrandPhoto("image"), createBrand);

router
  .route("/:id")
  .get(getBrand)
  .put(verifyJWT, uploadBrandPhoto("image"), updateBrand)
  .delete(verifyJWT, deleteBrand);

module.exports = router;
