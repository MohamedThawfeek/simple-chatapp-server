const yup = require("yup");

exports.ChatSchema = yup.object().shape({
  sender_id: yup.string("").required("email is required"),
});

exports.ChatCreateSchema = yup.object().shape({
  sender_id: yup.string("").required("email is required"),
  message: yup.string("").required("message is required"),
});
