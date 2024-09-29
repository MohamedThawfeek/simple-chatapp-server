const mongoose = require("mongoose");

const user = new mongoose.Schema(
  {
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    active_time: {
      type: String,
    },
  },
  { timestamps: true }
);

const User = mongoose.model("Users", user);

module.exports = User;
