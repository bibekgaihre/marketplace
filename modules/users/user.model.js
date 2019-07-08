const mongoose = require("mongoose");
const { ObjectId } = mongoose.Schema;

const userSchema = mongoose.Schema(
  {
    name: { type: String, rewuired: true },
    password: {
      hash: { type: String, required: true },
      salt: String
    },
    email: { type: String },
    phone: String,
    gender: { type: String, enum: ["male", "female", "others"] },
    username: { type: String, required: true, unique: true },
    is_active: { type: Boolean, default: true },
    roles: [{ type: String, required: true, enum: ["user", "vendor", "admin"], default: "user" }]
  },
  {
    collection: "user",
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
module.exports = mongoose.model("User", userSchema);
