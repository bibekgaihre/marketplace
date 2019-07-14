const mongoose = require("mongoose");
const { objectId } = mongoose.Schema;

const productSchema = mongoose.Schema(
  {
    title: {
      type: String,
      required: true
    },
    product_variations: {
      color: {
        type: String,
        required: false
      },
      size: {
        type: String,
        required: false
      },
      shape: {
        type: String,
        required: false
      }
    },
    description: {
      type: String,
      required: true
    },
    image_url: {
      type: String
    },
    support: {
      type: String,
      required: false
    },
    summary: [
      {
        title: {
          type: String
        },
        text: {
          type: String
        }
      }
    ],
    price: {
      currency: { type: String },
      range: {
        min: { type: Number, min: 0 },
        max: { type: Number, min: 0 }
      }
    },
    sub_category: {
      type: objectId,
      ref: "Subcategory"
    },
    vendor: {
      type: objectId,
      ref: "Vendor"
    }
  },
  {
    collection: "products",
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

module.exports = mongoose.model("Product", productSchema);
