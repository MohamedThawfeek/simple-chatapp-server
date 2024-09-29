const jwt = require("jsonwebtoken");

exports.Authentication = async (req, res, next) => {
  try {
    const token = await req.headers["authorization"];
    const tokens = token.split(" ")[1];
    const data = await jwt.verify(tokens, process.env.JWT_SECRET);
    req.id = data.id;
    next();
  } catch (error) {
    return res.status(400).json({
      success: false,
      message: "Invalid token",
    });
  }
};
