import jwt from "jsonwebtoken";

const generateToken = (res, userId) => {
  const token = jwt.sign({ userId }, process.env.JWT_SECRET, {
    expiresIn: 1000 * 5 * 60,
  });
  res.cookie("jwt", token, {
    httpOnly: true,
    secure: process.env.NODE_ENV !== "devlopment",
    sameSite: "strict",
    maxAge: 1000 * 5 * 60,
  });
};

export default generateToken;
