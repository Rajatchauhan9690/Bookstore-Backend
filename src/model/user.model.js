import mongoose, { Schema } from "mongoose";
import bcrypt from "bcrypt";

const userSchema = new Schema(
  {
    fullName: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    phone: {
      type: String,
      required: true,
    },
    gender: {
      type: String,
      enum: ["Male", "Female", "Other", "Prefer Not To Say"],
      required: true,
    },
    customGender: {
      type: String,
      default: "",
    },

    password: {
      type: String,
      required: true,
    },
    dob: {
      type: Date,
      required: true,
    },

    profileImage: {
      type: String,
      default: "",
    },
  },
  { timestamps: true, toJSON: { virtuals: true }, toObject: { virtuals: true } }
);

// 🔐 Hash password before saving
userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();
  this.password = await bcrypt.hash(this.password, 10);
  next();
});

// 🔍 Compare password method
userSchema.methods.isPasswordCorrect = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};

// 🌐 Virtual for full profile image URL
userSchema.virtual("profileImageUrl").get(function () {
  if (!this.profileImage) return "";
  const baseUrl = "http://localhost:3000";
  return `${baseUrl}/uploads/${this.profileImage}`;
});

export const User = mongoose.model("User", userSchema);
