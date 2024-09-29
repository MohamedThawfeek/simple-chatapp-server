const { createChat, getChats } = require("../../handler/chat/chat");

//hooks
const { ChatCreateSchema, ChatSchema } = require("../../utils/validation/chatSchema");

const yup = require("yup");

exports.ChatCreate = async function (req, res) {
  try {
    await ChatCreateSchema.validate(req.body, { abortEarly: false });
    const response = await createChat(req);
    return res.status(response.responseCode).send(response);
  } catch (err) {
    if (err instanceof yup.ValidationError) {
      const errorMessages = err.inner.reduce((acc, currentError) => {
        acc[currentError.path] = currentError.message;
        return acc;
      }, {});
      return res.status(400).json({ message: errorMessages });
    }
  }
};


exports.GetChats = async function (req, res) {
    try {
      await ChatSchema.validate(req.body, { abortEarly: false });
      const response = await getChats(req);
      return res.status(response.responseCode).send(response);
    } catch (err) {
      if (err instanceof yup.ValidationError) {
        const errorMessages = err.inner.reduce((acc, currentError) => {
          acc[currentError.path] = currentError.message;
          return acc;
        }, {});
        return res.status(400).json({ message: errorMessages });
      }
    }
  };
  