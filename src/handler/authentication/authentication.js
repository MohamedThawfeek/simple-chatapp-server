const UserSchema = require("../../models/user");
const bcrypt = require("bcryptjs");
const dayjs = require("dayjs");
const jwt = require("jsonwebtoken");

exports.signup = async (req) => {
  const { email, password } = req.body;

  try {
    const checkUser = await UserSchema.findOne({ email: email });

    if (checkUser) {
      return {
        success: false,
        message: "Email already exists",
      };
    }

    const salt = bcrypt.genSaltSync(10);
    const hash = bcrypt.hashSync(password, salt);

    await UserSchema.create({ email: email, password: hash });

    return {
      responseCode: 201,
      success: true,
      message: "User created successfully",
    };
  } catch (error) {
    return {
      responseCode: 500,

      success: false,
      message: "Email already exists",
      db_error: error.message,
    };
  }
};

exports.login = async (req) => {
  const { email, password } = req.body;

  try {
    const time = dayjs().toISOString();
    const checkUser = await UserSchema.findOne({
      email: email,
    });

    if (!checkUser) {
      return {
        success: false,
        message: "User does not exist",
      };
    }

    await UserSchema.findOneAndUpdate(
      {
        email: email,
      },
      { active_time: time }
    );

    const match = await bcrypt.compare(password, checkUser.password);

    if (match) {
      const token = jwt.sign({ id: checkUser._id }, process.env.JWT_SECRET, {
        expiresIn: "7d",
      });
      return {
        responseCode: 200,
        success: true,
        message: "User logged in successfully",
        token: token,
      };
    } else {
      return {
        responseCode: 403,
        success: false,
        message: "Incorrect password",
      };
    }
  } catch (error) {
    return {
      responseCode: 500,

      success: false,
      message: "Email already exists",
      db_error: error.message,
    };
  }
};

exports.getUser = async (req) => {
  const { id } = req;

  try {
    const checkUser = await UserSchema.findOne({ _id: id });

    if (!checkUser) {
      return {
        success: false,
        message: "User does not exist",
      };
    }

    return {
      responseCode: 200,

      success: true,
      message: "User logged in successfully",
      data: checkUser,
    };
  } catch (error) {
    return {
      responseCode: 500,

      success: false,
      message: "Email already exists",
      db_error: error.message,
    };
  }
};

exports.getContact = async (req) => {
  const { id } = req;

  try {
    const checkUser = await UserSchema.find().select("email active_time");

    const filter = await checkUser.filter((item) => item._id.toString() !== id);

    return {
      responseCode: 200,
      success: true,
      message: "Successfully get contact",
      data: filter,
    };
  } catch (error) {
    return {
      responseCode: 500,
      success: false,
      db_error: error.message,
    };
  }
};
