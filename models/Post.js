const mongoose = require("mongoose");

const postSchema = new mongoose.Schema(
  {
    text: {
      type: String,
      required: [true, "Text is required"],
    },
    image: {
      type: String,
      required: [true, "Image URL is required"],
    },
    brands: [
      {
        type: String,
      },
    ],
    clothes: [
      {
        type: String,
      },
    ],
    likes: [
      {
        user: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "users",
        },
      },
    ],
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Post", postSchema);
