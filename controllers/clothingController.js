const asyncHandler = require("express-async-handler");
const Clothing = require("../models/Clothing");
const Store = require("../models/Store");
const Brand = require("../models/Brand");

// @desc Add clothing to store
// @route POST /api/stores/:id/clothing
// @Access Private
const addClothingToStore = asyncHandler(async (req, res) => {
  const store = await Store.findById(req.body.storeId);

  if (!store) {
    return res.status(404).json({ success: false, error: "Store not found" });
  }

  // Check if user is store owner
  if (store.owner.toString() !== req.user.id) {
    return res.status(401).json({ success: false, error: "Not authorized" });
  }

  const { name, brand, price } = req.body;
  let brandId;
  if (brand) {
    const brandExists = await Brand.findById(brand);
    if (!brandExists) {
      return res.status(404).json({ success: false, error: "Brand not found" });
    }
    brandId = brandExists._id;
  }

  const clothing = await Clothing.create({
    name,
    brand: brandId,
    price,
    store: store._id,
  });

  store.clothing.push(clothing._id);
  await store.save();

  res.status(200).json({ success: true, data: clothing });
});

// @desc Remove clothing from store
// @route DELETE /api/stores/:storeId/clothing/:clothingId
// @Access Private
const removeClothingFromStore = asyncHandler(async (req, res) => {
  const store = await Store.findById(req.params.storeId);

  if (!store) {
    return res.status(404).json({ success: false, error: "Store not found" });
  }

  // Check if user is store owner
  if (store.owner.toString() !== req.user.id) {
    return res.status(401).json({ success: false, error: "Not authorized" });
  }

  const clothing = await Clothing.findById(req.params.clothingId);

  if (!clothing) {
    return res
      .status(404)
      .json({ success: false, error: "Clothing not found" });
  }

  if (clothing.store.toString() !== store._id.toString()) {
    return res
      .status(401)
      .json({ success: false, error: "Clothing not found in this store" });
  }

  await clothing.remove();

  res.status(200).json({ success: true, data: {} });
});

module.exports = {
  addClothingToStore,
  removeClothingFromStore,
};
