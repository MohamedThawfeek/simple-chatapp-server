const yup = require("yup");

exports.AuthSchema = yup.object().shape({
  email: yup.string("").required("email is required"),
  password: yup.string("").required("password is required"),
});
