import { User } from "../model/user.model.js";

export const register = async (req, res) => {
  try {
    const { fullName, email, password, phone, gender, customGender, dob } =
      req.body;
    const profileImage = req.file ? req.file.filename : undefined;

    const allowedGenders = ["Male", "Female", "Other", "Prefer Not To Say"];
    if (!allowedGenders.includes(gender)) {
      return res.status(400).json({ message: "Invalid gender value" });
    }

    if (gender === "Other" && !customGender) {
      return res
        .status(400)
        .json({ message: "Please provide a custom gender" });
    }

    if (!dob) {
      return res.status(400).json({ message: "Date of birth is required" });
    }

    const parsedDob = new Date(dob);
    if (isNaN(parsedDob.getTime())) {
      return res.status(400).json({ message: "Invalid date of birth format" });
    }

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "Email already registered" });
    }

    const newUser = await User.create({
      fullName,
      email,
      password,
      phone,
      gender,
      dob: parsedDob, // use the validated date
      customGender: gender === "Other" ? customGender : "",
      profileImage,
    });

    // console.log(newUser);

    res.status(201).json({
      message: "User registered",
      user: newUser.toJSON(),
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    // 🔍 Check if user exists
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: "User is not registered" });
    }

    // 🔑 Compare password
    const isMatch = await user.isPasswordCorrect(password);
    if (!isMatch) {
      return res.status(400).json({ message: "Invalid email or password" });
    }

    res.status(200).json({
      message: "Login successful",
      user: user.toJSON(),
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};

export const getProfile = async (req, res) => {
  try {
    const { id } = req.body;

    if (!id) {
      return res.status(400).json({ message: "User ID is required" });
    }

    const user = await User.findById(id).select("-password");

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    res.status(200).json({ user });
  } catch (error) {
    console.error("Get profile error:", error);
    res.status(500).json({ message: "Server error" });
  }
};

export const updateProfile = async (req, res) => {
  try {
    const { id, fullName, email, phone, gender, customGender, dob } = req.body;
    const profileImage = req.file ? req.file.filename : undefined;

    if (!id) {
      return res.status(400).json({ message: "User ID is required" });
    }

    const updateData = {
      fullName,
      email,
      phone,
      gender,
      customGender: gender === "Other" ? customGender : "",
    };

    if (dob) {
      updateData.dob = new Date(dob);
    }

    if (profileImage) {
      updateData.profileImage = profileImage;
    }

    const updatedUser = await User.findByIdAndUpdate(id, updateData, {
      new: true,
    });

    if (!updatedUser) {
      return res.status(404).json({ message: "User not found" });
    }

    res.status(200).json({
      message: "Profile updated successfully",
      user: updatedUser.toJSON(),
    });
  } catch (error) {
    console.error("Update error:", error);
    res.status(500).json({ message: "Server error" });
  }
};
