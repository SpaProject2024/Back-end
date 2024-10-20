// models/user.js
import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    pin: { type: String, required: true },
    userID: { type: String, required: true, unique: true },
    fullName:{ type: String, required: true, unique: true},

  },
  { timestamps: true }
);

const User = mongoose.model("User", userSchema);
export default User;
