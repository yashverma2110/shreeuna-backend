const mongoose = require("mongoose");

const categorySchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

categorySchema.virtual("medicine", {
  ref: "Medicine",
  localField: "_id",
  foreignField: "category",
});

const Category = mongoose.model("Category", categorySchema);

module.exports = Category;
