const mongoose = require("mongoose");
const { objectId } = mongoose.Schema;

const abstractSchema = mongoose.Schema(
  {
    product: {
      type: objectId,
      ref: "Product"
    },
    reviews: { type: String },
    ratings: {
      type: Number,
      default: 0,
      min: 0,
      max: 5
    },
    user: {
      type: objectId,
      ref: "User"
    },
    feedback: { type: String }
  },
  {
    collection: "abstracts",
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

module.exports = mongoose.model("Abstract", abstractSchema);
