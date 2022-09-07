const mongoose = require("mongoose");

const ProductSchema = new mongoose.Schema(
  {
    productName: { type: String, required: true, unique: true },
    description: { type: String, required: true },
    images: { type: Array, required: true },
    price: { type: String, required: true },
    stock: { type: String, required: true },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Product", ProductSchema);
