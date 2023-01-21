const mongoose = require("mongoose");

const clothingSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Please add a name"],
      unique: true,
      trim: true,
    },
    brand: {
      type: mongoose.Schema.ObjectId,
      ref: "Brand",
      required: true,
    },
    price: {
      type: Number,
      required: [true, "Please add a price"],
    },
    store: {
      type: mongoose.Schema.ObjectId,
      ref: "Store",
      required: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Clothing", clothingSchema);
