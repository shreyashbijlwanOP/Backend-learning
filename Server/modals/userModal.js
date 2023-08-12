import mongoose from "mongoose";
import bcrypt from "bcryptjs";
// Creating Schema
const userSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

// To hash Password
//  before save we want to Run Function
userSchema.pre("save", async function (next) {
  // If password is not modified
  if (!this.isModified("password")) {
    next();
  }

  // salt Created
  const salt = await bcrypt.genSalt(7);

  // creating a Hash Function
  this.password = await bcrypt.hash(this.password, salt);
});

// to Match password
userSchema.methods.matchPasswords = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};

// Modal will take 2 Thing name of modal and Schema
const User = mongoose.model("User", userSchema);

export default User;
