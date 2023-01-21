const asyncHandler = require("express-async-handler");
const Brand = require("../models/Brand");

const uploadBrandPhoto = require("../middleware/uploadBrandPhoto");

// @desc Create a brand

// @desc Create a brand
// @route POST /api/brands
// @Access Private
const createBrand = asyncHandler(async (req, res) => {
  const { name, description, phone, email, website } = req.body;
  const image = req.image;
  const user = req.user.id;

  console.log(req.body);

  const brand = await Brand.create({
    name,
    description,
    image,
    phone,
    email,
    website,
    user,
  });

  res.status(201).json({ success: true, data: brand });
});

// @desc Get all brands
// @route GET /api/brands
// @Access Public
const getBrands = asyncHandler(async (req, res) => {
  const brands = await Brand.find();

  res.status(200).json({ success: true, data: brands });
});

// @desc Get a single brand
// @route GET /api/brands/:id
// @Access Public
const getBrand = asyncHandler(async (req, res) => {
  const brand = await Brand.findById(req.params.id);

  if (!brand) {
    return res.status(404).json({ success: false, error: "Brand not found" });
  }

  res.status(200).json({ success: true, data: brand });
});

// @desc Update a brand
// @route PUT /api/brands/:id
// @Access Private
const updateBrand = asyncHandler(async (req, res) => {
  const brand = await Brand.findById(req.params.id);
  if (!brand) {
    return res.status(404).json({ success: false, error: "Brand not found" });
  }

  const updatedBrand = await Brand.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
  });

  res.status(200).json({ success: true, data: updatedBrand });
});

// @desc Delete a brand
// @route DELETE /api/brands/:id
// @Access Private
const deleteBrand = asyncHandler(async (req, res) => {
  const brand = await Brand.findById(req.params.id);
  if (!brand) {
    return res.status(404).json({ success: false, error: "Brand not found" });
  }

  await brand.remove();

  res.status(200).json({ success: true, data: {} });
});

module.exports = {
  createBrand,
  getBrands,
  getBrand,
  updateBrand,
  deleteBrand,
};
