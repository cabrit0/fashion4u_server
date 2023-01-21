const asyncHandler = require("express-async-handler");
const Store = require("../models/Store");
const Brand = require("../models/Brand");
const User = require("../models/User");

// @desc Create a store
// @route POST /api/stores
// @Access Private
const createStore = asyncHandler(async (req, res) => {
  const { name, owner, ownerType } = req.body; 
  console.log(req.body);

  let ownerId;
  if (ownerType === "brand") {
    const brand = await Brand.findById(owner);
    if (!brand) {
      return res.status(404).json({ success: false, error: "Brand not found" });
    }
    ownerId = brand._id;
  } else {
    const user = await User.findById(owner);
    if (!user) {
      return res.status(404).json({ success: false, error: "User not found" });
    }
    ownerId = user._id;
  }

  const store = await Store.create({
    name,
    owner: ownerId,
    ownerType,
  });

  res.status(201).json({ success: true, data: store });
});

// @desc Get all stores
// @route GET /api/stores
// @Access Public
const getStores = asyncHandler(async (req, res) => {
  const stores = await Store.find();

  res.status(200).json({ success: true, data: stores });
});

// @desc Get a single store
// @route GET /api/stores/:id
// @Access Public
const getStore = asyncHandler(async (req, res) => {
  const store = await Store.findById(req.params.id);

  if (!store) {
    return res.status(404).json({ success: false, error: "Store not found" });
  }

  res.status(200).json({ success: true, data: store });
});

// @desc Update a store
// @route PUT /api/stores/:id
// @Access Private
const updateStore = asyncHandler(async (req, res) => {
  const store = await Store.findById(req.params.id);

  if (!store) {
    return res.status(404).json({ success: false, error: "Store not found" });
  }

  // Check if user is store owner
  if (store.owner.toString() !== req.user.id) {
    return res.status(401).json({ success: false, error: "Not authorized" });
  }

  const updatedStore = await Store.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
  });

  res.status(200).json({ success: true, data: updatedStore });
});

// @desc Delete a store
// @route DELETE /api/stores/:id
// @Access Private
const deleteStore = asyncHandler(async (req, res) => {
  const store = await Store.findById(req.params.id);

  if (!store) {
    return res.status(404).json({ success: false, error: "Store not found" });
  }

  // Check if user is store owner
  if (store.owner.toString() !== req.user.id) {
    return res.status(401).json({ success: false, error: "Not authorized" });
  }

  await store.remove();

  res.status(200).json({ success: true, data: {} });
});


module.exports = {
  createStore,
  getStores,
  getStore,
  updateStore,
  deleteStore,
};
