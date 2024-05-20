import UserModel from "../models/UserModel.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

export const register = async (req, res) => {
  try {
    const pswd = req.body.password;
    const { fullName, email, avatarUrl } = req.body;
    const user = await UserModel.findOne({ email });
    if (user) {
      return res.json({
        message: `${user.email} уже занят!`,
      });
    }
    const salt = bcrypt.genSaltSync(10);
    const hash = bcrypt.hashSync(pswd, salt);
    const doc = new UserModel({ fullName, email, password: hash, avatarUrl });
    const newUser = await doc.save();

    const token = jwt.sign(
      {
        _id: newUser._id,
      },
      process.env.JWT_SECRET,
      { expiresIn: "30d" }
    );

    const { password, ...userData } = newUser._doc;
    res.status(200).json({
      message: "User has been registered successfully",
      user: {
        ...userData,
      },
      token,
    });
  } catch (error) {
    return res.status(500).json({ error: "An error occured!" });
  }
};

export const login = async (req, res) => {
  try {
    const user = await UserModel.findOne({ email: req.body.email });
    if (!user) {
      return res.status(404).json({ message: "Пользователь не найден" });
    }
    const isValidPas = await bcrypt.compare(req.body.password, user.password);
    if (!isValidPas) {
      return res.status(400).json({
        message: "Неверный логин или пароль",
      });
    }
    const token = jwt.sign(
      {
        _id: user._id,
      },
      process.env.JWT_SECRET,
      {
        expiresIn: "30d",
      }
    );
    const { password, ...userData } = user._doc;
    res.json({
      ...userData,
      token,
    });
    return res.status(200).json({ message: "Login" });
  } catch (error) {
    return res.status(500).json({ error: "An error occured!" });
  }
};

export const getMe = async (req, res) => {
  try {
    const user = await UserModel.findById(req.userId);
    if (!user) {
      return res.status(404).json({
        message: "User not found!",
      });
    }
    const { password, ...userData } = user._doc;
    return res.json(userData);
  } catch (error) {
    return res.status(500).json({ error: "An error occured!" });
  }
};
