import asyncHandler from "express-async-handler";
import User from "../modals/userModal.js";
import generateToken from "../utilities/genToken.js";

// @desc    Auth user/set Token
// route    POST / api/user/auth
// @access  Public
const authUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  if (!user) {
    res.status(404).send({ msg: "Invalid Email" });
    return;
  }

  // checking handling condition asynchronous
  const isPwdMatch = await user.matchPasswords(password);

  if (!isPwdMatch) {
    res.status(404).send({ msg: "Invalid Password" });
    return;
  }

  generateToken(res, user._id);
  res.status(201).send({
    _id: user._id,
    name: user.name,
    email: user.email,
  });
});

// @desc    Register
// route    POST / api/user
// @access  Public
const registerUser = asyncHandler(async (req, res) => {
  //  get Body
  const { name, email, password } = req.body;

  // Check User Exist Or Not

  const userExists = await User.findOne({ email });
  // If user exist
  if (userExists) {
    res.status(400);
    // Throw is Like Return
    throw new Error("user already exist, try Login with same");
  }

  const user = await User.create({
    name,
    email,
    password,
  });

  if (user) {
    generateToken(res, user._id);
    res.status(201).json({
      _id: user._id,
      name: user.name,
      email: user.email,
    });
  } else {
    res.status(400);
    throw new Error("Invalid Data");
  }
});

// @desc    Register
// route    POST / api/user/logout
// @access  Public
const logoutUser = asyncHandler(async (req, res) => {
  res.cookie("jwt", "", {
    httpOnly: true,
    expires: new Date(0),
  });
  res.status(200).json({ msg: "User Logged Out successfully" });
});

// @desc    get User details
// route    GET / api/users/profile
// @access  Private
const getUserProfile = asyncHandler(async (req, res) => {
  res.status(200).json(req.user);
});

// @desc    Update user Profile
// route    PUT / api/users/profile
// @access  Private
const updateUserProfile = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user._id);
  if (!user) {
    res.status(404).send({ msg: "User Not Found" });
    throw new Error("User Not Found");
  }

  if (user) {
    user.name = req.body.name || user.name;
    user.email = req.body.email || user.email;

    if (req.body.password) {
      user.password = req.body.password;
    }

    const updatedUser = await user.save();
    res.status(200).send(updatedUser);
  }
});

export {
  authUser,
  registerUser,
  logoutUser,
  getUserProfile,
  updateUserProfile,
};
