const User = require("../models/user");
const jwt = require("jsonwebtoken");

exports.signIn = async (req, res, next) => {
  try {
    let user = await User.findOne({ email: req.body.email });
    let { id, username, profileImageUrl } = user;
    let isMatch = await user.comparePassword(req.body.password);
    if (isMatch) {
      let token = jwt.sign(
        { id, username, profileImageUrl },
        process.env.JWT_SECRET_KEY
      );
      return res.status(200).json({
        id,
        usernmane,
        profileImageUrl,
        token,
      });
    } else {
      return next({
        status: 400,
        message: "Invalid email/password!",
      });
    }
  } catch (error) {
    return next({
      status: 400,
      message: "Invalid email or password!",
    });
  }
};

exports.signUp = async (req, res, next) => {
  try {
    let newUser = await User.create(req.body);
    let { id, email, username, profileImageUrl } = newUser;
    let token = jwt.sign(
      { id, email, username, profileImageUrl },
      process.env.JWT_SECRET_KEY
    );
    return res.status(200).json({
      id,
      email,
      username,
      profileImageUrl,
      token,
    });
  } catch (error) {
    if (error.code === 11000) {
      error.message = "Sorry this email/username is already taken!";
    }
    return next({
      status: 400,
      message: error.message,
    });
  }
};
