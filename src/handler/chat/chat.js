const ChatSchema = require("../../models/chat");

exports.createChat = async (req) => {
  const { id } = req;
  const { sender_id, message } = req.body;

  try {
    await ChatSchema.create({ user_id: id, sender_id, message });

    const getNewMessage = await ChatSchema.find({ user_id: id, sender_id });
    const getOldMessage = await ChatSchema.find({
      user_id: sender_id,
      sender_id: id,
    });

    const mergedMessages = [...getNewMessage, ...getOldMessage];

    mergedMessages.sort(
      (a, b) => new Date(a.createdAt) - new Date(b.createdAt)
    );


    global.io.emit("new message", {
      data: mergedMessages,
    });

    return {
      responseCode: 201,

      success: true,
      message: "Chat created successfully",
    };
  } catch (error) {
    return {
      responseCode: 500,

      success: false,
      message: error.message,
    };
  }
};

exports.getChats = async (req) => {
  const { id } = req;
  const { sender_id } = req.body;

  try {
    const getNewMessage = await ChatSchema.find({ user_id: id, sender_id });
    const getOldMessage = await ChatSchema.find({
      user_id: sender_id,
      sender_id: id,
    });

    const mergedMessages = [...getNewMessage, ...getOldMessage];

    mergedMessages.sort(
      (a, b) => new Date(a.createdAt) - new Date(b.createdAt)
    );

    
    return {
      responseCode: 200,

      success: true,
      message: "Chat created successfully",
      data: mergedMessages,
    };
  } catch (error) {
    return {
      responseCode: 500,

      success: false,
      message: error.message,
    };
  }
};
