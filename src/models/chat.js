const mongoose = require("mongoose");

const chat = new mongoose.Schema(
  {
    user_id: {
      type: String,
      required: true,
    },
    sender_id: {
      type: String,
      required: true,
    },
    message: {
      type: String,
    },
  },
  { timestamps: true }
);

const Chat = mongoose.model("chats", chat);

module.exports = Chat;
