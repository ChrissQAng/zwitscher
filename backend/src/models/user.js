import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    email: { type: String, required: true },
    tweetsId: [{ type: String }], // Ahmed delete
    commentsId: [{ type: String }], // Ahmed delete
    passwordHash: { type: String, required: true, trim: true },
    passwordSalt: { type: String, required: true, trim: true },
    isEmailVerified: { type: Boolean, default: false },
    sixDigitCode: { type: String, required: true },
  },
  { collection: "users", timestamps: true }
);

export const User = mongoose.model("User", userSchema);
