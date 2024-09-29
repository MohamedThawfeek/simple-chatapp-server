const {
  login,
  signup,
  getUser,
  getContact
} = require("../../handler/authentication/authentication");

//hooks
const { AuthSchema } = require("../../utils/validation/authSchema");

const yup = require("yup");

exports.Signup = async function (req, res) {
  try {
    await AuthSchema.validate(req.body, { abortEarly: false });
    
    const response = await signup(req);
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

exports.Login = async function (req, res) {
  try {
    await AuthSchema.validate(req.body, { abortEarly: false });
    const response = await login(req);
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

exports.GetUser = async function (req, res) {
  try {
    const response = await getUser(req);
    return res.status(response.responseCode).send(response);
  } catch (err) {
    return res.status(400).json({ message: err.message });
  }
};


exports.GetContact = async function (req, res) {
  try {
    const response = await getContact(req);
    return res.status(response.responseCode).send(response);
  } catch (err) {
    return res.status(400).json({ message: err.message });
  }
};
