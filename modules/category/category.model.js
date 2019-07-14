const mongoose = require("mongoose");
const { objectId } = mongoose.Schema;

const categorySchema = mongoose.Schema(
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
    }
  },
  {
    collection: "categories",
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

module.exports = mongoose.model("Category", categorySchema);
