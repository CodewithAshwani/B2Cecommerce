const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    maxlength: 15,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  role: {
    type: String,
    enum: ["Admin", "Consumer"],
    required: true,
  },
  phoneNumber: {
    type: String,
    required: true,
    minlength: 10,
    maxlength: 10,
  },
  isVerified: {
    type: Boolean,
    default: false,
  },
  token: {
    type: String,
    required: true,
  },
  cart: [{ type: Schema.Types.objectId, ref: "Cart" }],
  timestamps: true,
});

const User = mongoose.model("User", userSchema);
module.exports = User;
