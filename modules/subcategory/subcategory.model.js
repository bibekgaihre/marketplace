const mongoose = require("mongoose");
const { objectId } = mongoose.Schema;

const subcategorySchema = mongoose.Schema(
  {
    title: {
      type: String,
      required: true
    },
    description: {
      type: String,
      required: true
    },
    image_url: {
      type: String,
      required: true
    },
    category: {
      type: objectId,
      ref: "Category"
    }
  },
  {
    collection: "subcategories",
    timeStamps: {
      createdAt: "created_at",
      updatedAt: "updated_at"
    },
    toObject: {
      virtuals: true
    },
    toJson: {
      virtuals: true
    }
  }
);

module.exports = mongoose.model("Subcategory", subcategorySchema);
