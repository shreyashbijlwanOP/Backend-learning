import jwt from "jsonwebtoken";

import expressAsyncHandler from "express-async-handler";

import User from "../modals/userModal.js";

const protect = expressAsyncHandler(async (req, res, next) => {
  let token = req.cookies.jwt;

  if (!token) {
    res.status(401);
    throw new Error("un-authorized access, please Login First");
  }

  if (token) {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    req.user = await User.findById(decoded.userId).select("-password");
    next();
    try {
    } catch (error) {
      throw new Error("No Authorized, Invalid Token");
    }
  }
});

export { protect };
