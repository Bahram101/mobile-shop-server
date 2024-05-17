import User from "../models/User.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

export const register = async (req, res) => {
  try {
    const { fullName, email, password, avatarUrl } = req.body;
    const user = await User.findOne({ email });
    if (user) {
      return res.json({
        message: `${user.email} уже занят!`,
      });
    }
    const salt = bcrypt.genSaltSync(10);
    const hash = bcrypt.hashSync(password, salt);
    const doc = new User({ fullName, email, password: hash, avatarUrl });
    const newUser = await doc.save();

    const token = jwt.sign(
      {
        _id: newUser._id,
      },
      "secret123",
      { expiresIn: "30d" }
    );

    const { password, ...userData } = newUser._doc;
    res.json({ ...userData, token });
    return res
      .status(200)
      .json({ message: "User has been registered successfully" });
  } catch (error) {
    return res.status(500).json({ error: "An error occured!" });
  }
};

export const login = async (req, res) => {
  try {
    return res.status(200).json({ message: "Login" });
  } catch (error) {
    return res.status(500).json({ error: "An error occured!" });
  }
};

export const getMe = async (req, res) => {
  try {
    return res.status(200).json({ message: "Me" });
  } catch (error) {
    return res.status(500).json({ error: "An error occured!" });
  }
};
