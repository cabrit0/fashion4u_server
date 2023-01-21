const mongoose = require("mongoose");

const storeSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Please add a name"],
      unique: true,
      trim: true,
    },
    owner: {
      type: mongoose.Schema.ObjectId,
      ref: "User",
      required: true,
    },
    ownerType: {
      type: String,
      required: true,
      enum: ["brand", "user"],
    },
    clothing: [
      {
        type: mongoose.Schema.ObjectId,
        ref: "Clothing",
      },
    ],
  },
  { timestamps: true }
);

module.exports = mongoose.model("Store", storeSchema);
