import mongoose from "mongoose";
import bcrypt from "bcryptjs"; // Pure JS version, no native conflicts

console.log("🔒 Using bcryptjs for User model");

const userSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      required: [true, "Email is required"],
      unique: true,
      lowercase: true,
      trim: true,
    },
    password: {
      type: String,
      required: [true, "Password is required"],
      minlength: 3,
      trim: true,
    },
  },
  { timestamps: true }
);

// Hash password before saving
userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();
  try {
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
    next();
  } catch (err) {
    console.error("Password hashing failed:", err);
    next(err);
  }
});

// Compare entered password with stored one
userSchema.methods.matchPassword = async function (enteredPassword) {
  try {
    return await bcrypt.compare(enteredPassword, this.password);
  } catch (err) {
    console.error("Password comparison failed:", err);
    return false;
  }
};

const User = mongoose.model("User", userSchema);
export default User;
